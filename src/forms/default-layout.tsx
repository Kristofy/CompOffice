import { FormProps } from './type-info';

export function getLayout<Model extends object>(
	allFields: FormProps<Model & Record<string, any>, unknown, 'All'>,
	hiddenColumns: Record<keyof Model | string, boolean>
) {
	const visible = Object.entries(allFields).filter(([k, v]) => !hiddenColumns[k]);
	const total = visible.reduce((acc, [k, v]) => acc + (v.ratio ?? 1), 0);

	return visible.map(([k, v]) => <col key={k} style={{ width: `${v.ratio ?? 100 / total}%` }} />);
}
