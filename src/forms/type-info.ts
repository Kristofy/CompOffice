import { UseQueryResult } from '@tanstack/react-query';
import {
	Schema,
	ZodNumber,
	ZodObject,
	ZodRawShape,
	ZodSchema,
	ZodString,
	number,
	unknown,
	z,
} from 'zod';
import { unit } from '@prisma/client';
import { FormType } from './form-config';
import { ReactNode } from 'react';
import { getLayout } from './default-layout';

/**
 * Data Handler Utility types
 */

type KeyWithZodSchema<T> = Required<{
	[K in keyof T]: z.ZodType<T[K]>;
}>;

interface DataHandlerServer<Model extends object> {
	useQuery: () => UseQueryResult<Model[], any>;
}

interface DataHandlerConfigSchema<T> {
	api: z.ZodType<T>;
	form: z.ZodTypeAny;
}

interface DataHandlerSchema<T extends object> {
	api: ZodObject<KeyWithZodSchema<T>>;
	form: ZodObject<KeyWithZodSchema<T>>;
}

/**
 * T is the object of all files
 * U is the current fieds infered type
 */
export interface FormProps<T extends object, K> {
	type?: FormType;
	filter?: ({ target, data }: { target: K; data: T }) => boolean;
	// TODO(Kristofy): This is sortable and filterable optionally
	header?: ({ filter }: { filter: ReactNode }) => ReactNode;
	default?: K;
	min?: number;
	max?: number;
	ratio?: number;
	hidden?: boolean;
	unique?: boolean;
	required?: boolean;
}

type DataHandlerConfigModel<Property> = {
	api: DataHandlerConfigSchema<Property>['api'];
	form?: DataHandlerConfigSchema<Property>['form'];
	calc?: never;
};

type DataHandlerConfigAdditional<Model extends object> = {
	api?: never;
	form?: never;
	calc?: ({ data }: { data: Model }) => unknown;
};

type FromFormZodSchema<K> = DataHandlerConfigModel<K>['form'] extends undefined
	? undefined
	: z.input<Exclude<DataHandlerConfigModel<K>['form'], undefined>>;
type FromCalc<Model extends object> = DataHandlerConfigAdditional<Model>['calc'] extends undefined
	? undefined
	: ReturnType<Exclude<DataHandlerConfigAdditional<Model>['calc'], undefined>>;

interface DataHandlerConfig<Model extends object, Additional extends object> {
	server: DataHandlerServer<Model>;
	fields: {
		[K in keyof Model]: DataHandlerConfigModel<Model[K]> & FormProps<Model & Additional, K>;
	};
	additional?: {
		[K in keyof Additional]: DataHandlerConfigAdditional<Model> & FormProps<Model, FromCalc<Model>>;
	};
}

/**
 * Data Handler
 */

export interface DataHandlerColumn<T extends object, U extends object, K> {
	keys: (keyof T)[];
	props: FormProps<U, K>;
}

// HA filed FormProps<Model & Additional, K>
// Ha additional FormProps<Model, FromCalc<Model>>
interface DataHandlerColumnTypes<
	Model extends object,
	K extends keyof Model,
	Additional extends object,
> {
	model: DataHandlerColumn<Model, Model & Additional, K>;
	additional: DataHandlerColumn<Additional, Model, FromCalc<Model>>;
	all: DataHandlerColumn<Additional & Model, Model & Additional, K | FromCalc<Model>>;
}

interface DataHandlerFormProps<Model extends object, Additional extends object> {
	columnLayout: ReactNode;
}

export class DataHandler<Model extends object> {
	schema: DataHandlerSchema<Model>;
	columns: DataHandlerColumnTypes<Model, keyof Model, Record<string, any>>;
	server: DataHandlerServer<Model>;
	form: DataHandlerFormProps<Model, Record<string, any>>;

	// TODO(Kristofy): We should make sure that there is no overlap between the keys of the model and the additional fields
	constructor({ server, fields, additional }: DataHandlerConfig<Model, Record<string, any>>) {
		this.server = server;

		const modelEntries = Object.entries<any>(fields) as [
			keyof Model,
			DataHandlerConfigModel<any> & FormProps<Model & Record<string, any>, any>,
		][];
		const additionalEntries = !additional
			? []
			: (Object.entries<any>(additional) as [
					keyof Record<string, any>,
					DataHandlerConfigAdditional<any> & FormProps<Model, FromCalc<Model>>,
				][]);

		const modelKeys = modelEntries.map(([key]) => key) as (keyof Model)[];
		const additionalKeys = additionalEntries.map(([key]) => key) as string[];

		const modelProps = Object.fromEntries(
			modelEntries.map(([key, { api, form, calc, ...props }]) => [key, { ...props }])
		) as {
			[K in keyof Model]: FormProps<Model & Record<string, any>, K>;
		};

		const additionalProps = Object.fromEntries(
			additionalEntries.map(([key, { calc, api, form, ...props }]) => [key, { ...props }])
		) as {
			[K in keyof Record<string, any>]: FormProps<Model, FromCalc<Model>>;
		};

		const apiSchemas = modelEntries.map(([key, { api }]) => [key, api]);
		const apiSchema = z.object(
			Object.fromEntries(apiSchemas) as { [K in keyof Model]: ZodSchema<Model[K]> }
		) as ZodObject<KeyWithZodSchema<Model>>;

		const formSchemas = modelEntries.map(([key, { form }]) => [key, form ?? z.any()]);
		const formSchema = z.object(
			Object.fromEntries(formSchemas) as { [K in keyof Model]: Schema<any> }
		) as ZodObject<KeyWithZodSchema<Model>>;

		this.columns = {
			model: {
				keys: modelKeys,
				props: modelProps,
			},
			additional: {
				keys: additionalKeys,
				props: additionalProps,
			},
			all: {
				keys: [...modelKeys, ...additionalKeys],
				props: { ...modelProps, ...additionalProps },
			},
		};

		this.schema = {
			api: apiSchema,
			form: formSchema,
		};

		this.form = {
			columnLayout: getLayout(this.columns.all.props),
		};
	}
}
