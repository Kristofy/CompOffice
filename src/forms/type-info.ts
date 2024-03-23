import { Schema, ZodNumber, ZodObject, ZodRawShape, ZodSchema, ZodString, number, z } from 'zod';

export type Properties<Input> = Required<{
	[K in keyof Input]: z.ZodType<Input[K]>;
}>;

export function schemaKeys<T extends ZodRawShape>(schema: ZodObject<T>): (keyof T)[] {
	return Object.keys(schema.shape) as (keyof T)[];
}

export interface SchemaNumberProperties {
	minValue: number | null;
	maxValue: number | null;
}

export interface SchemaStringProperties {
	minLength: number | null;
	maxLength: number | null;
}

export interface SchemaProperties {
	isNumber: boolean;
	isString: boolean;
	isBoolean: boolean;
	isRequired: boolean;
	numberProps: SchemaNumberProperties | null;
	stringProps: SchemaStringProperties | null;
}

export const FormType = {
	number: 'number',
	string: 'string',
} as const;

export type FormType = (typeof FormType)[keyof typeof FormType];

export interface FormExtras {
	type: FormType;
	default?: any;
	unique?: boolean;
}

export interface Validator<T> {
	/**
	 * Schema for the form
	 * It should only contain validation rules for the input fields and
	 * coercion rules if needed, since the form fields are almost always strings.
	 * @date 3/23/2024 - 4:44:20 PM
	 *
	 * @type {z.ZodObject<Properties<T>>}
	 */
	formSchema: z.ZodObject<Properties<T>>;

	/**
	 * The schema for the API
	 * It should contain every validation rule that the database expects.
	 * The schema can expect the input fields to be coerced to the correct type.
	 * Can throw errors if the input is invalid. (even if the type is incorrect)
	 * @date 3/23/2024 - 4:45:54 PM
	 *
	 * @type {z.ZodObject<Properties<T>>}
	 */
	apiSchema: z.ZodObject<Properties<T>>;

	schemaProperties: Map<keyof T, SchemaProperties>;
	extras: Record<keyof T, FormExtras>;
}

interface SchemaZodField<T> {
	form: ZodSchema<any>;
	api: ZodSchema<T>;
}

type SchemaField<T> = SchemaZodField<T> & FormExtras;

type KeyToZodSchemaField<T> = {
	[K in keyof T]: SchemaField<T[K]>;
};

type KeyToZodSchema<T> = {
	[K in keyof T]: ZodSchema<T[K]>;
};

export function createValidator<T>(schema: KeyToZodSchemaField<T>): Validator<T> {
	type Entries<T> = Extract<
		{ [K in keyof T]: [K, SchemaField<T[K]>] }[keyof T],
		[string, SchemaField<any>]
	>;
	const schemaEntries = Object.entries(schema) as Entries<T>[];

	const apiEntries = schemaEntries.map(([key, field]) => [key, field.api]) as [
		keyof T,
		ZodSchema<any>,
	][];

	const apiSchema = Object.fromEntries(apiEntries) as KeyToZodSchema<T>;
	const zodApiSchema = z.object(apiSchema) as ZodObject<Properties<T>>;

	const formEntries = schemaEntries.map(([key, field]) => [key, field.form]) as [
		keyof T,
		ZodSchema<any>,
	][];

	const formSchema = Object.fromEntries(formEntries) as KeyToZodSchema<T>;
	const zodFormSchema = z.object(formSchema) as ZodObject<Properties<T>>;

	const extras = Object.fromEntries(
		schemaEntries.map(([key, field]) => {
			const { api, form, ...extras } = field;
			return [key, extras] as [keyof T, FormExtras];
		})
	) as Record<keyof T, FormExtras>;

	return {
		formSchema: zodFormSchema,
		apiSchema: zodApiSchema,
		schemaProperties: getSchemaProperties(zodFormSchema),
		extras: extras,
	};
}

function getSchemaProperties<T extends ZodRawShape>(
	schema: ZodObject<T>
): Map<keyof T, SchemaProperties> {
	const fieldProps = new Map<keyof T, SchemaProperties>();

	for (const key in schema.shape) {
		let field = schema.shape[key];

		let formFieldProps: SchemaProperties = {
			isNumber: false,
			isString: false,
			isBoolean: false,
			isRequired: true,
			numberProps: null,
			stringProps: null,
		};

		if (field.isNullable() || field.isOptional()) {
			formFieldProps.isRequired = false;
			field = field?._def?.innerType;
		}

		if (field instanceof ZodNumber) {
			formFieldProps.isNumber = true;
			formFieldProps.numberProps = {
				minValue: field.minValue,
				maxValue: field.maxValue,
			};
		}

		if (field instanceof ZodString) {
			formFieldProps.isString = true;
			formFieldProps.stringProps = {
				minLength: field.minLength,
				maxLength: field.maxLength,
			};
		}

		fieldProps.set(key as keyof T, formFieldProps);
	}

	return fieldProps;
}
