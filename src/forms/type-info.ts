import { ReactNode } from 'react';

import { Schema, z, ZodObject, ZodSchema } from 'zod';

import { UseQueryResult } from '@tanstack/react-query';

import { getLayout } from './default-layout';
import { FormType } from './form-config';

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

export interface TableOrder<T> {
	prop: keyof T | string;
	order: 'ASC' | 'DESC';
}

interface DataHandlerTableHeaderProps<Model extends object> {
	dataHandler: DataHandler<Model>;
	filterValues: Record<keyof Model | string, any>;
}

/**
 * T is the object of all files
 * U is the current fieds infered type
 */
export interface FormProps<
	T extends object,
	K,
	A extends 'Additional' | 'Model' | 'All' = 'Model',
> {
	type?: FormType;
	filter?: ({ target, data }: { target: K; data: T }) => boolean;
	// TODO(Kristofy): This is sortable and filterable optionally
	header?: <Model extends object>(props: DataHandlerTableHeaderProps<Model>) => ReactNode;
	default?: K;
	min?: number;
	max?: number;
	ratio?: number;
	hidden?: boolean;
	unique?: boolean;
	required?: boolean;
	calc?: A extends 'Model'
		? never
		: A extends 'Additinal'
			? ({ data }: { data: T }) => unknown
			: undefined | (({ data }: { data: T }) => unknown);
}

type DataHandlerConfigModel<Property> = {
	api: DataHandlerConfigSchema<Property>['api'];
	form?: DataHandlerConfigSchema<Property>['form'];
	calc?: never;
};

type DataHandlerConfigAdditional<Model extends object> = {
	api?: never;
	form?: never;
	calc?: ({ data }: { data: Model }) => any;
};

interface DataHandlerConfig<Model extends object, Additional extends object> {
	server: DataHandlerServer<Model>;
	fields: {
		[K in keyof Model]: DataHandlerConfigModel<Model[K]> &
			FormProps<Model & Additional, Model[K], 'Model'>;
	};
	additional?: {
		[K in keyof Additional]: DataHandlerConfigAdditional<Model> &
			FormProps<Model, any, 'Additional'>;
	};
}

/**
 * Data Handler
 */

export interface DataHandlerColumn<
	T extends object,
	U extends object,
	A extends 'Additional' | 'Model' | 'All' = 'Model',
> {
	keys: (keyof T)[];
	props: {
		[K in keyof U]: FormProps<U, U[K], A>;
	};
}

// HA filed FormProps<Model & Additional, K>
// Ha additional FormProps<Model, FromCalc<Model>>
interface DataHandlerColumnTypes<Model extends object, Additional extends object> {
	model: DataHandlerColumn<Model, Model & Additional, 'Model'>;
	additional: DataHandlerColumn<Additional, Model & Additional, 'Additional'>;
	all: DataHandlerColumn<Additional & Model, Model & Additional, 'All'>;
}

interface DataHandlerFormProps<Model extends object, Additional extends object> {
	getColumnLayout: (hiddenColumns: Record<keyof Model | string, boolean>) => ReactNode;
}

export class DataHandler<Model extends object> {
	schema: DataHandlerSchema<Model>;
	columns: DataHandlerColumnTypes<Model, Record<string, any>>;
	server: DataHandlerServer<Model>;
	form: DataHandlerFormProps<Model, Record<string, any>>;

	// TODO(Kristofy): We should make sure that there is no overlap between the keys of the model and the additional fields
	constructor({ server, fields, additional }: DataHandlerConfig<Model, Record<string, any>>) {
		this.server = server;

		const modelEntries = Object.entries<any>(fields) as [
			keyof Model,
			DataHandlerConfigModel<any> & FormProps<Model & Record<string, any>, any, 'Model'>,
		][];
		const additionalEntries = !additional
			? []
			: (Object.entries<any>(additional) as [
					keyof Record<string, any>,
					DataHandlerConfigAdditional<any> & FormProps<Model, any, 'Additional'>,
				][]);

		const modelKeys = modelEntries.map(([key]) => key) as (keyof Model)[];
		const additionalKeys = additionalEntries.map(([key]) => key) as string[];

		const modelProps = Object.fromEntries(
			modelEntries.map(([key, { api, form, calc, ...props }]) => [key, { ...props }])
		) as {
			[K in keyof Model | string]: FormProps<
				Model & Record<string, any>,
				(Model & Record<string, any>)[K],
				'Model'
			>;
		};

		const additionalProps = Object.fromEntries(
			additionalEntries.map(([key, { api, form, ...props }]) => [key, { ...props }])
		) as {
			[K in keyof (Model & Record<string, any>)]: FormProps<
				Model & Record<string, any>,
				(Model & Record<string, any>)[K],
				'Additional'
			>;
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
			getColumnLayout: (hiddenColumns: Record<keyof Model | string, boolean>) =>
				getLayout(this.columns.all.props, hiddenColumns),
		};
	}
}
