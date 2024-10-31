import {
	pack,
	pack_event,
	pack_unit,
	pack_unit_event,
	pack_version,
	participant,
	topic,
	unit,
	unit_version,
} from '@prisma/client';
import { z } from 'zod';
import { DataHandler } from '@/forms/type-info';

export const unitValidator = new DataHandler<unit>({
	tableName: 'unit',
	server: {
		fields: {
			topic_name: {
				calc: ({ data }) => {
					return 'Pending...';
				},
				type: {
					kind: 'string',
				},
				displayName: 'Topic Name',
				hidden: false,
			},
		},
	},
	fields: {
		id: {
			form: z.string().min(1).pipe(z.coerce.number()),
			api: z.number(),
			displayName: 'ID',
			type: {
				kind: 'number',
			},
		},
		code: {
			form: z.string().min(1).max(50),
			api: z.string().min(1).max(50),
			type: {
				kind: 'string',
			},
			filter: ({ target, data }) => data.code.toLowerCase().includes(target.toLowerCase()),
		},
		name: {
			form: z.string().min(1).max(500).nullable(),
			api: z.string().min(1).max(500).nullable(),
			displayName: 'Name',
			type: {
				kind: 'string',
			},
			filter: ({ target, data }) => {
				if (!target) return true;
				return !!data.name?.toLowerCase().includes(target.toLowerCase());
			},
		},
		status: {
			form: z.enum(['A', 'I']),
			api: z.enum(['A', 'I']),
			displayName: 'Status',
			type: {
				kind: 'enum',
				possibleValues: [
					{ value: 'A', label: 'Active' },
					{ value: 'I', label: 'Inactive' },
				],
			},
			filter: ({ target, data }) => data.status.toLowerCase().includes(target.toLowerCase()),
		},
		type: {
			form: z.string(),
			api: z.enum(['T', 'S', 'C']),
			displayName: 'Type',
			type: {
				kind: 'enum',
				possibleValues: [
					{ value: 'T', label: 'Training' },
					{ value: 'S', label: 'Support' },
					{ value: 'C', label: 'Consulting' },
				],
			},
			filter: ({ target, data }) => data.type.toLowerCase().includes(target.toLowerCase()),
		},
		topic: {
			form: z.string().min(1).pipe(z.coerce.number()),
			api: z.number().nullable(),
			displayName: 'Topic',
			type: {
				kind: 'connected',
				connected_table: 'topic',
				connected_label: 'name',
				connected_value: 'id',
			},
			hidden: true,
		},
		list_price_HUF: {
			form: z.string().nullable().pipe(z.coerce.number().nullable()),
			api: z.number().nullable(),
			displayName: 'List Price HUF',
			type: {
				kind: 'number',
			},
		},
		list_price_EUR: {
			form: z.string().nullable().pipe(z.coerce.number().nullable()),
			api: z.number().nullable(),
			displayName: 'List Price EUR',
			type: {
				kind: 'number',
			},
		},
		length: {
			form: z.string().pipe(z.coerce.number().min(0)).nullable(),
			api: z.number().nullable(),
			displayName: 'Length',
			type: {
				kind: 'number',
			},
		},
	},
	additional: {
		testing: {
			calc: ({ data }: { data: unit }) => {
				return (data.list_price_HUF ?? 0) % 2;
			},
			filter: ({ target, data }: { target: string; data: unit & Record<string, any> }) => {
				return parseInt(target) % 2 === data.testing;
			},
		},
	},
});

// for each key in unit I have a field in the form

/// unit_version
// id: number;
// unit: number;
// version: string;
// is_default: string;
// published: string;
export const unitVersionValidator = new DataHandler<unit_version>({
	tableName: 'unit_version',
	server: {
		fields: {
			unit_name: {
				calc: ({ data }) => {
					return 'Pending...';
				},
				type: {
					kind: 'string',
				},
				displayName: 'Unit Name',
				hidden: false,
			},
		},
	},
	fields: {
		id: {
			form: z.string().min(1).pipe(z.coerce.number()),
			api: z.number(),
			displayName: 'ID',
			type: {
				kind: 'number',
			},
		},
		unit: {
			form: z.string().min(1).pipe(z.coerce.number()),
			api: z.number(),
			displayName: 'Unit',
			type: {
				kind: 'connected',
				connected_table: 'unit',
				connected_label: 'name',
				connected_value: 'id',
			},
		},
		version: {
			form: z.string().min(1).max(50),
			api: z.string().min(1).max(50),
			displayName: 'Version',
			type: {
				kind: 'string',
			},
		},
		is_default: {
			form: z.enum(['Y', 'N']),
			api: z.enum(['Y', 'N']),
			displayName: 'Is Default',
			type: {
				kind: 'enum',
				possibleValues: [
					{ value: 'Y', label: 'Yes' },
					{ value: 'N', label: 'No' },
				],
			},
		},
		published: {
			form: z.enum(['Y', 'N']),
			api: z.enum(['Y', 'N']),
			displayName: 'Is Published',
			type: {
				kind: 'enum',
				possibleValues: [
					{ value: 'Y', label: 'Yes' },
					{ value: 'N', label: 'No' },
				],
			},
		},
	},
});

// pack
// type pack = {
//     id: number;
//     code: string;
//     name: string | null;
//     status: string;
//     list_price_HUF: number | null;
//     list_price_EUR: number | null;
//     topic: number | null;
//     type: string;
// }
export const packValidator = new DataHandler<pack>({
	tableName: 'pack',
	server: {
		fields: {
			topic_name: {
				calc: ({ data }) => {
					return 'Pending...';
				},
				type: {
					kind: 'string',
				},
				displayName: 'Topic Name',
				hidden: false,
			},
		},
	},
	fields: {
		id: {
			form: z.string().min(1).pipe(z.coerce.number()),
			api: z.number(),
			displayName: 'ID',
			type: {
				kind: 'number',
			},
		},
		code: {
			form: z.string().min(1).max(50),
			api: z.string().min(1).max(50),
			type: {
				kind: 'string',
			},
			filter: ({ target, data }) => data.code.toLowerCase().includes(target.toLowerCase()),
		},
		name: {
			form: z.string().min(1).max(500).nullable(),
			api: z.string().min(1).max(500).nullable(),
			displayName: 'Name',
			type: {
				kind: 'string',
			},
			filter: ({ target, data }) => {
				if (!target) return true;
				return !!data.name?.toLowerCase().includes(target.toLowerCase());
			},
		},
		status: {
			form: z.enum(['A', 'I']),
			api: z.enum(['A', 'I']),
			displayName: 'Status',
			type: {
				kind: 'enum',
				possibleValues: [
					{ value: 'A', label: 'Active' },
					{ value: 'I', label: 'Inactive' },
				],
			},
		},
		type: {
			form: z.string(),
			api: z.enum(['T', 'S', 'C']),
			displayName: 'Type',
			type: {
				kind: 'enum',
				possibleValues: [
					{ value: 'T', label: 'Training' },
					{ value: 'S', label: 'Support' },
					{ value: 'C', label: 'Consulting' },
				],
			},
		},
		topic: {
			form: z.string().min(1).pipe(z.coerce.number()),
			api: z.number().nullable(),
			displayName: 'Topic',
			type: {
				kind: 'connected',
				connected_table: 'topic',
				connected_label: 'name',
				connected_value: 'id',
			},
			hidden: true,
		},
		list_price_HUF: {
			form: z.string().nullable().pipe(z.coerce.number().nullable()),
			api: z.number().nullable(),
			displayName: 'List Price HUF',
			type: {
				kind: 'number',
			},
		},
		list_price_EUR: {
			form: z.string().nullable().pipe(z.coerce.number().nullable()),
			api: z.number().nullable(),
			displayName: 'List Price EUR',
			type: {
				kind: 'number',
			},
		},
	},
});

// pack_version
// type pack_version = {
//     id: number;
//     pack: number;
//     version: string;
//     is_default: string;
//     published: string;
// }
export const packVersionValidator = new DataHandler<pack_version>({
	tableName: 'pack_version',
	server: {
		fields: {
			pack_name: {
				calc: ({ data }) => {
					return 'Pending...';
				},
				type: {
					kind: 'string',
				},
				displayName: 'Pack Name',
				hidden: false,
			},
		},
	},
	fields: {
		id: {
			form: z.string().min(1).pipe(z.coerce.number()),
			api: z.number(),
			displayName: 'ID',
			type: {
				kind: 'number',
			},
		},
		pack: {
			form: z.string().min(1).pipe(z.coerce.number()),
			api: z.number(),
			displayName: 'Pack',
			type: {
				kind: 'connected',
				connected_table: 'pack',
				connected_label: 'name',
				connected_value: 'id',
			},
		},
		version: {
			form: z.string().min(1).max(50),
			api: z.string().min(1).max(50),
			displayName: 'Version',
			type: {
				kind: 'string',
			},
		},
		is_default: {
			form: z.enum(['Y', 'N']),
			api: z.enum(['Y', 'N']),
			displayName: 'Is Default',
			type: {
				kind: 'enum',
				possibleValues: [
					{ value: 'Y', label: 'Yes' },
					{ value: 'N', label: 'No' },
				],
			},
		},
		published: {
			form: z.enum(['Y', 'N']),
			api: z.enum(['Y', 'N']),
			displayName: 'Is Published',
			type: {
				kind: 'enum',
				possibleValues: [
					{ value: 'Y', label: 'Yes' },
					{ value: 'N', label: 'No' },
				],
			},
		},
	},
});

// pack_evnet
//  /**
//        * Elsődleges kulcs
//        *
//        * @format uuid
//        */
//  id: number
//  /**
//   * A Kurzus azonosítója
//   */
//  pack: number
//  /**
//   * A Projekt státusza
//   *
//   * A projekt lehet:
//   * - folyamatban PR
//   * - befejezett CL
//   * - törölt CA
//   */
//  status: string
//  /**
//   * A projekt ára forintban
//   */
//  price_HUF: number | null
//  /**
//   * A projekt ára euróban
//   */
//  price_EUR: number | null
//  /**
//   * A projekt kezdő dátuma
//   */
//  start_date: Date | null
//  /**
//   * A projekt befejező dátuma
//   */
//  end_date: Date | null
//  /**
//   * A projektből származó bevétel forintban
//   */
//  income_HUF: number | null
//  /**
//   * A projektből származó bevétel euróban
//   */
//  income_EUR: number | null
//  /**
//   * A projekt típusa
//   *
//   * A projekt lehet:
//   * - Mindenki számára nyílt képzés OPEN
//   * - Zárt csoportos képzés CL
//   * - Csak az írott tananyagot tartalmazó képzés CW
//   */
//  training_type: string
//  /**
//   * Az automatikus laborkörnyezet kiépítésének státusza
//   */
//  labor_status: string
//  /**
//   * Az automatikus tananyag kiküldés státusza
//   */
//  courseware_status: string
//  /**
//   * Az automatikus teams csoportok létrehozása és felvételek státusza
//   */
//  teams_status: string
//  /**
//   * FAR szükséges-e
//   */
//  is_far_required: string | null
//  /**
//   * QR
//   */
//  qr_eval: string | null
//  /**
//   * Az oktató neve
//   *
//   * Több oktató esetén "Több oktató"
//   */
//  instructor_txt: string | null
//  /**
//   * A megrendelő cég neve
//   *
//   * Több cég esetén "Több cég"
//   */
//  customer_txt: string | null
export const packEventValidator = new DataHandler<pack_event>({
	tableName: 'pack_event',
	server: {
		fields: {
			pack_version_name: {
				calc: ({ data }) => {
					return 'Pending...';
				},
				type: {
					kind: 'string',
				},
				displayName: 'Pack Name',
				hidden: false,
			},
		},
	},
	fields: {
		id: {
			form: z.string().min(1).pipe(z.coerce.number()),
			api: z.number(),
			displayName: 'ID',
			type: {
				kind: 'number',
			},
		},
		pack: {
			form: z.string().min(1).pipe(z.coerce.number()),
			api: z.number(),
			displayName: 'Pack',
			type: {
				kind: 'connected',
				connected_table: 'pack',
				connected_label: 'name',
				connected_value: 'id',
			},
		},
		status: {
			form: z.enum(['PR', 'CL', 'CA']),
			api: z.enum(['PR', 'CL', 'CA']),
			displayName: 'Status',
			type: {
				kind: 'enum',
				possibleValues: [
					{ value: 'PR', label: 'In Progress' },
					{ value: 'CL', label: 'Completed' },
					{ value: 'CA', label: 'Deleted' },
				],
			},
		},
		price_HUF: {
			form: z.string().nullable().pipe(z.coerce.number().nullable()),
			api: z.number().nullable(),
			displayName: 'Price HUF',
			type: {
				kind: 'number',
			},
		},
		price_EUR: {
			form: z.string().nullable().pipe(z.coerce.number().nullable()),
			api: z.number().nullable(),
			displayName: 'Price EUR',
			type: {
				kind: 'number',
			},
		},
		start_date: {
			form: z.string().nullable().pipe(z.coerce.date().nullable()),
			api: z.date().nullable(),
			displayName: 'Start Date',
			type: {
				kind: 'string',
			},
		},
		end_date: {
			form: z.string().nullable().pipe(z.coerce.date().nullable()),
			api: z.date().nullable(),
			displayName: 'End Date',
			type: {
				kind: 'string',
			},
		},
		income_HUF: {
			form: z.string().nullable().pipe(z.coerce.number().nullable()),
			api: z.number().nullable(),
			displayName: 'Income HUF',
			type: {
				kind: 'number',
			},
		},
		income_EUR: {
			form: z.string().nullable().pipe(z.coerce.number().nullable()),
			api: z.number().nullable(),
			displayName: 'Income EUR',
			type: {
				kind: 'number',
			},
		},
		training_type: {
			form: z.string(),
			api: z.enum(['OPEN', 'CL', 'CW']),
			displayName: 'Training Type',
			type: {
				kind: 'enum',
				possibleValues: [
					{ value: 'OPEN', label: 'Open Training' },
					{ value: 'CL', label: 'Closed Group Training' },
					{ value: 'CW', label: 'Courseware Only' },
				],
			},
		},
		labor_status: {
			form: z.string(),
			api: z.enum(['Y', 'N']),
			displayName: 'Labor Status',
			type: {
				kind: 'enum',
				possibleValues: [
					{ value: 'Y', label: 'Yes' },
					{ value: 'N', label: 'No' },
				],
			},
		},
		courseware_status: {
			form: z.string(),
			api: z.enum(['Y', 'N']),
			displayName: 'Courseware Status',
			type: {
				kind: 'enum',
				possibleValues: [
					{ value: 'Y', label: 'Yes' },
					{ value: 'N', label: 'No' },
				],
			},
		},
		teams_status: {
			form: z.string(),
			api: z.enum(['Y', 'N']),
			displayName: 'Teams Status',
			type: {
				kind: 'enum',
				possibleValues: [
					{ value: 'Y', label: 'Yes' },
					{ value: 'N', label: 'No' },
				],
			},
		},
		is_far_required: {
			form: z.string().nullable(),
			api: z.string().nullable(),
			displayName: 'Is FAR Required',
			type: {
				kind: 'string',
			},
		},
		qr_eval: {
			form: z.string().nullable(),
			api: z.string().nullable(),
			displayName: 'QR Eval',
			type: {
				kind: 'string',
			},
		},
		instructor_txt: {
			form: z.string().nullable(),
			api: z.string().nullable(),
			displayName: 'Instructor',
			type: {
				kind: 'string',
			},
		},
		customer_txt: {
			form: z.string().nullable(),
			api: z.string().nullable(),
			displayName: 'Customer',
			type: {
				kind: 'string',
			},
		},
	},
});

// pack_unit
//    /**
//        * Elsődleges kulcs
//        *
//        * @format uuid
//        */
//    id: number
//    /**
// 	* A csomag megfelelő verziójának azonosítója
// 	*/
//    pack: number
//    /**
// 	* A modul megfelelő verziójának azonosítója
// 	*/
export const packUnitValidator = new DataHandler<pack_unit>({
	tableName: 'pack_unit',
	server: {
		fields: {
			pack_name_version: {
				calc: ({ data }) => {
					return 'Pending...';
				},
				type: {
					kind: 'string',
				},
				displayName: 'Pack Name Version',
				hidden: false,
			},
			unit_name_version: {
				calc: ({ data }) => {
					return 'Pending...';
				},
				type: {
					kind: 'string',
				},
				displayName: 'Unit Name Version',
				hidden: false,
			},
		},
	},
	fields: {
		id: {
			form: z.string().min(1).pipe(z.coerce.number()),
			api: z.number(),
			displayName: 'ID',
			type: {
				kind: 'number',
			},
		},
		pack: {
			form: z.string().min(1).pipe(z.coerce.number()),
			api: z.number(),
			displayName: 'Pack',
			type: {
				kind: 'connected',
				connected_table: 'pack',
				connected_label: 'name',
				connected_value: 'id',
			},
		},
		unit: {
			form: z.string().min(1).pipe(z.coerce.number()),
			api: z.number(),
			displayName: 'Unit',
			type: {
				kind: 'connected',
				connected_table: 'unit',
				connected_label: 'name',
				connected_value: 'id',
			},
		},
	},
});

// pack_unit_event
// /**
//        * Elsődleges kulcs
//        *
//        * @format uuid
//        */
// id: number
// /**
//  * A Projekt azonosítója
//  */
// pack_event: number
// /**
//  * A Csomag és a modul azonosítója
//  */
// pack_unit: number
// /**
//  * A modul státusza
//  *
//  * A modul lehet:
//  * - folyamatban PR
//  * - befejezett CL
//  * - törölt CA
//  */
// status: string
// /**
//  * A modul kezdő dátuma
//  */
// start_date: Date | null
// /**
//  * A modul befejező dátuma
//  */
// end_date: Date | null
// /**
//  * Az időpont státusza
//  *
//  * Az időpont lehet:
//  * - hiányzó M
//  * - tervezett P
//  * - fix F
//  */
// date_status: string
// /**
//  * A modul kezdő időpontja lokális idő szerint
//  */
// start_time_loc: Date | null
// /**
//  * A modul befejező időpontja lokális idő szerint
//  */
// end_time_loc: Date | null
// /**
//  * A modul kezdete az adott napokon HH:MM
//  */
// start_time_part: Date | null
// /**
//  * A modul vége az adott napokon HH:MM
//  */
// end_time_part: Date | null
// /**
//  * A modul időzónája
//  *
//  * Az oktatás ehhez az időzónához igazodik
//  */
// timezone: string | null
// /**
//  * A helyszín típusa
//  *
//  * A helyszín lehet:
//  * - Online On
//  * - Az oktató cégnél Com
//  * - Ügyfélnél Cu
//  */
// place_type: string
// /**
//  * Az oktatás országa (ha az oktatás helyszíne az ügyfél cégénél van)
//  */
// country: string | null
// /**
//  * Az oktatás városa (ha az oktatás helyszíne az ügyfél cégénél van)
//  */
// city: string | null
// /**
//  * Az oktatás nyelve
//  */
// language: string
// /**
//  * Az oktatásra jelentkezett résztvevők száma
//  */
// participant_number: number | null
// /**
//  * Félnapos oktatás esetén a naprész (AM, PM, FULL)
//  */
// daypart: string
// /**
//  * Megjegyzések
//  */
// notes: string | null
// /**
//  * Az időzóna különbsége a magyar időzónához képest
//  */
// timezone_diff: number | null
// /**
//  * Az oktatandó ügyfelek a Szombat - Vasárnapot tekintik hétvégeknek
//  */
// is_traditional_weekend: string
export const packUnitEventValidator = new DataHandler<pack_unit_event>({
	tableName: 'pack_unit_event',
	server: {
		fields: {
			pack_name_version: {
				calc: ({ data }) => {
					return 'Pending...';
				},
				type: {
					kind: 'string',
				},
				displayName: 'Pack Name Version',
				hidden: false,
			},
			unit_name_version: {
				calc: ({ data }) => {
					return 'Pending...';
				},
				type: {
					kind: 'string',
				},
				displayName: 'Unit Name Version',
				hidden: false,
			},
		},
	},
	fields: {
		id: {
			form: z.string().min(1).pipe(z.coerce.number()),
			api: z.number(),
			displayName: 'ID',
			type: {
				kind: 'number',
			},
		},
		pack_event: {
			form: z.string().min(1).pipe(z.coerce.number()),
			api: z.number(),
			displayName: 'Pack Event',
			type: {
				kind: 'connected',
				connected_table: 'pack_event',
				connected_label: 'id',
				connected_value: 'id',
			},
		},
		pack_unit: {
			form: z.string().min(1).pipe(z.coerce.number()),
			api: z.number(),
			displayName: 'Pack Unit',
			type: {
				kind: 'connected',
				connected_table: 'pack_unit',
				connected_label: 'id',
				connected_value: 'id',
			},
		},
		status: {
			form: z.enum(['PR', 'CL', 'CA']),
			api: z.enum(['PR', 'CL', 'CA']),
			displayName: 'Status',
			type: {
				kind: 'enum',
				possibleValues: [
					{ value: 'PR', label: 'In Progress' },
					{ value: 'CL', label: 'Completed' },
					{ value: 'CA', label: 'Deleted' },
				],
			},
		},
		start_date: {
			form: z.string().nullable().pipe(z.coerce.date().nullable()),
			api: z.date().nullable(),
			displayName: 'Start Date',
			type: {
				kind: 'string',
			},
		},
		end_date: {
			form: z.string().nullable().pipe(z.coerce.date().nullable()),
			api: z.date().nullable(),
			displayName: 'End Date',
			type: {
				kind: 'string',
			},
		},
		date_status: {
			form: z.enum(['M', 'P', 'F']),
			api: z.enum(['M', 'P', 'F']),
			displayName: 'Date Status',
			type: {
				kind: 'enum',
				possibleValues: [
					{ value: 'M', label: 'Missing' },
					{ value: 'P', label: 'Planned' },
					{ value: 'F', label: 'Fixed' },
				],
			},
		},
		start_time_loc: {
			form: z.string().nullable().pipe(z.coerce.date().nullable()),
			api: z.date().nullable(),
			displayName: 'Start Time Loc',
			type: {
				kind: 'string',
			},
		},
		end_time_loc: {
			form: z.string().nullable().pipe(z.coerce.date().nullable()),
			api: z.date().nullable(),
			displayName: 'End Time Loc',
			type: {
				kind: 'string',
			},
		},
		start_time_part: {
			form: z.string().nullable().pipe(z.coerce.date().nullable()),
			api: z.date().nullable(),
			displayName: 'Start Time Part',
			type: {
				kind: 'string',
			},
		},
		end_time_part: {
			form: z.string().nullable().pipe(z.coerce.date().nullable()),
			api: z.date().nullable(),
			displayName: 'End Time Part',
			type: {
				kind: 'string',
			},
		},
		timezone: {
			form: z.string().nullable(),
			api: z.string().nullable(),
			displayName: 'Timezone',
			type: {
				kind: 'string',
			},
		},
		place_type: {
			form: z.enum(['On', 'Com', 'Cu']),
			api: z.enum(['On', 'Com', 'Cu']),
			displayName: 'Place Type',
			type: {
				kind: 'enum',
				possibleValues: [
					{ value: 'On', label: 'Online' },
					{ value: 'Com', label: 'At Instructor Company' },
					{ value: 'Cu', label: 'At Customer' },
				],
			},
		},
		country: {
			form: z.string().nullable(),
			api: z.string().nullable(),
			displayName: 'Country',
			type: {
				kind: 'string',
			},
		},
		city: {
			form: z.string().nullable(),
			api: z.string().nullable(),
			displayName: 'City',
			type: {
				kind: 'string',
			},
		},
		language: {
			form: z.string(),
			api: z.string(),
			displayName: 'Language',
			type: {
				kind: 'string',
			},
		},
		participant_number: {
			form: z.string().nullable().pipe(z.coerce.number().nullable()),
			api: z.number().nullable(),
			displayName: 'Participant Number',
			type: {
				kind: 'number',
			},
		},
		daypart: {
			form: z.enum(['AM', 'PM', 'FULL']),
			api: z.enum(['AM', 'PM', 'FULL']),
			displayName: 'Daypart',
			type: {
				kind: 'enum',
				possibleValues: [
					{ value: 'AM', label: 'AM' },
					{ value: 'PM', label: 'PM' },
					{ value: 'FULL', label: 'FULL' },
				],
			},
		},
		notes: {
			form: z.string().nullable(),
			api: z.string().nullable(),
			displayName: 'Notes',
			type: {
				kind: 'string',
			},
		},
		timezone_diff: {
			form: z.string().nullable().pipe(z.coerce.number().nullable()),
			api: z.number().nullable(),
			displayName: 'Timezone Diff',
			type: {
				kind: 'number',
			},
		},
		is_traditional_weekend: {
			form: z.string(),
			api: z.enum(['Y', 'N']),
			displayName: 'Is Traditional Weekend',
			type: {
				kind: 'enum',
				possibleValues: [
					{ value: 'Y', label: 'Yes' },
					{ value: 'N', label: 'No' },
				],
			},
		},
	},
});

// topic
//   /**
//        * Elsődleges kulcs
//        *
//        * @format uuid
//        */
//   id: number
//   /**
//    * A téma megnevezése
//    */
//   name: string
export const topicValidator = new DataHandler<topic>({
	tableName: 'topic',
	server: {},
	fields: {
		id: {
			form: z.string().min(1).pipe(z.coerce.number()),
			api: z.number(),
			displayName: 'ID',
			type: {
				kind: 'number',
			},
		},
		name: {
			form: z.string().min(1).max(500),
			api: z.string().min(1).max(500),
			displayName: 'Name',
			type: {
				kind: 'string',
			},
		},
	},
});
