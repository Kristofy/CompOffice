import { FormExtras } from './type-info';

export function defaultLayout<T>(extras: Record<keyof T, FormExtras<T>>) {
	const visible = Object.entries<FormExtras<T>>(extras).filter(([_, v]) => !v.hidden);
	const total = visible.reduce((acc, [k, v]) => acc + (v.ratio ?? 1), 0);

	return {
		gridLayout: visible.map(([k, v]) => `${v.ratio ?? 1}fr`).join(' '),
		columnLayout: visible.map(([k, v]) => {
			return <col key={k} style={{ width: `${v.ratio ?? 100 / total}%` }} />;
		}),
	};
}
