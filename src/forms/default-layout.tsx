import { DataHandlerColumn, FormProps } from './type-info';

export function getLayout<Model extends object>(
	allFields: FormProps<Model & Record<string, any>, unknown>
) {
	const visible = Object.entries(allFields).filter(([_, v]) => !v.hidden);
	const total = visible.reduce((acc, [k, v]) => acc + (v.ratio ?? 1), 0);

	return visible.map(([k, v]) => <col key={k} style={{ width: `${v.ratio ?? 100 / total}%` }} />);
}
