export const FormType = {
	number: 'number',
	string: 'string',
} as const;

export type FormType = (typeof FormType)[keyof typeof FormType];
