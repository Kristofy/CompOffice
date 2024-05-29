export interface BaseFormType {
	kind: string;
};

export interface EnumFormType extends BaseFormType {
	kind: 'enum';
	possibleValues: { label: string, value: any }[];
};

export interface StringFormType extends BaseFormType {
	kind: 'string';
};

export interface NumberFormType extends BaseFormType {
	kind: 'number';
};

export interface ConnectedFormType extends BaseFormType {
	kind: 'connected';
	connected_table: string;
	connected_label: string;
	connected_value: string;
};

export type FormType = (
	| StringFormType
	| NumberFormType
	| EnumFormType
	| ConnectedFormType
);