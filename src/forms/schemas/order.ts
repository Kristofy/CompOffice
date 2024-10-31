import {
	customer,
	customer_contact,
	industry,
	order_pack_event,
	participant,
} from '@prisma/client';
import { DataHandler } from '../type-info';
import { z } from 'zod';
import { UseQueryResult } from '@tanstack/react-query';
import { trpc } from '@/trpc/client/client';

// /**
//        * Elsődleges kulcs
//        *
//        * @format uuid
//        */
// id: number
// /**
//  * Ügyfél neve
//  */
// name: string | null
// /**
//  * Ügyfél országa / székhelye
//  */
// country: string
// /**
//  * Az ügyfél tevékenységi köre
//  *
//  * Meghatározza, hogy milyen iparágban tevékenykedik az ügyfél a {@link industry.id} táblában szereplő iparágak közül
//  */
// industry: number | null
// /**
//  * Fizetési határidő
//  */
// terms: number | null
export const customerValidator = new DataHandler<customer>({
	tableName: 'customer',
	server: {
		fields: {
			industry_name: {
				calc: ({ data }) => {
					return 'Pending...';
				},
				type: {
					kind: 'string',
				},
				displayName: 'Industry Name',
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
		name: {
			form: z.string().nullable(),
			api: z.string().nullable(),
			displayName: 'Name',
			type: {
				kind: 'string',
			},
		},
		country: {
			form: z.string(),
			api: z.string(),
			displayName: 'Country',
			type: {
				kind: 'string',
			},
		},
		industry: {
			form: z.string().nullable().pipe(z.coerce.number().nullable()),
			api: z.number().nullable(),
			displayName: 'Industry',
			type: {
				kind: 'connected',
				connected_table: 'industry',
				connected_label: 'name',
				connected_value: 'id',
			},
		},
		terms: {
			form: z.string().nullable().pipe(z.coerce.number().nullable()),
			api: z.number().nullable(),
			displayName: 'Terms',
			type: {
				kind: 'number',
			},
		},
	},
});

// customer contact
// /**
//        * Elsődleges kulcs
//        *
//        * @format uuid
//        */
// id: number
// /**
//  * Kapcsolattartó vezetékneve
//  */
// last_name: string
// /**
//  * Kapcsolattartó keresztneve
//  */
// first_name: string
// /**
//  * Kapcsolattartó neve
//  */
// display_name: string
// /**
//  * Kapcsolattartó (publikus) email címe
//  */
// email: string | null
// /**
//  * Kapcsolattartó (privát) email címe
//  */
// email_private: string | null
// /**
//  * Kapcsolattartó telefonszáma
//  */
// phone1: string | null
// /**
//  * Kapcsolattartó másodlagos telefonszáma
//  */
// phone2: string | null
// /**
//  * A kapcsolattaró munkahelye
//  */
// customer: number
// /**
//  * Egyéb megjegyzés
//  */
// note: string | null
export const customerContactValidator = new DataHandler<customer_contact>({
	tableName: 'customer_contact',
	server: {
		fields: {
			customer_name: {
				calc: ({ data }) => {
					return 'Pending...';
				},
				type: {
					kind: 'string',
				},
				displayName: 'Customer Name',
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
		last_name: {
			form: z.string(),
			api: z.string(),
			displayName: 'Last Name',
			type: {
				kind: 'string',
			},
		},
		first_name: {
			form: z.string(),
			api: z.string(),
			displayName: 'First Name',
			type: {
				kind: 'string',
			},
		},
		display_name: {
			form: z.string(),
			api: z.string(),
			displayName: 'Display Name',
			type: {
				kind: 'string',
			},
		},
		email: {
			form: z.string().nullable(),
			api: z.string().nullable(),
			displayName: 'Email',
			type: {
				kind: 'string',
			},
		},
		email_private: {
			form: z.string().nullable(),
			api: z.string().nullable(),
			displayName: 'Private Email',
			type: {
				kind: 'string',
			},
		},
		phone1: {
			form: z.string().nullable(),
			api: z.string().nullable(),
			displayName: 'Phone 1',
			type: {
				kind: 'string',
			},
		},
		phone2: {
			form: z.string().nullable(),
			api: z.string().nullable(),
			displayName: 'Phone 2',
			type: {
				kind: 'string',
			},
		},
		customer: {
			form: z.string().min(1).pipe(z.coerce.number()),
			api: z.number(),
			displayName: 'Customer',
			type: {
				kind: 'connected',
				connected_table: 'customer',
				connected_label: 'name',
				connected_value: 'id',
			},
		},
		note: {
			form: z.string().nullable(),
			api: z.string().nullable(),
			displayName: 'Note',
			type: {
				kind: 'string',
			},
		},
	},
});

// industry
// /**
//        * Elsődleges kulcs
//        *
//        * @format uuid
//        */
// id: number
// /**
//  * Az iparág neve
//  */
// name: string | null
export const industryValidator = new DataHandler<industry>({
	tableName: 'industry',
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
			form: z.string().nullable(),
			api: z.string().nullable(),
			displayName: 'Name',
			type: {
				kind: 'string',
			},
		},
	},
});

// order_pack_event
// /**
//        * Elsődleges kulcs
//        *
//        * @format uuid
//        */
// id: number
// /**
//  * A projekt azonosítója
//  */
// pack_event: number
// customer: number
// /**
//  * A számlázandó cég azonosítója
//  */
// inv_customer: number
// /**
//  * Az ügyfél kapcsolattartójának azonosítója
//  */
// contact: number | null
// /**
//  * A megrendelésből származó várható összeg
//  *
//  * A várható összeg a `expected_amount_currency` valutában van megadva
//  */
// expected_amount: number
// /**
//  * A várható összeg valutája
//  */
// expected_amount_currency: string
// /**
//  * A várható összeg áttszámolva forintba
//  */
// expected_amount_HUF: number | null
// /**
//  * A várható összeg áttszámolva euróba
//  */
// expected_amount_EUR: number | null
// /**
//  * ÁFA mértéke
//  */
// vat: number | null
// /**
//  * Kifizetési időpontja
//  */
// payment_date: Date | null
// /**
//  * Rendelés időpontja (Kimutatásokhoz)
//  */
// actual_report_date: Date | null
// /**
//  * A rendelés státusza
//  *
//  * A megrendelés lehet:
//  * - Tervezett LEAD
//  * - Informális INFOR
//  * - Megrendelt OR
//  * - Befejezett FIN
//  * - Törölt CA
//  */
// status: string
// /**
//  * Van e hozzá kapcsolódó ajánlat
//  */
// qoute: string
// /**
//  * Árajánlat
//  */
// qoute_number: string | null
// /**
//  * PO státusza
//  */
// po: string
// /**
//  * PO száma
//  */
// po_number: string | null
// /**
//  * Case száma
//  */
// case_id: string | null
// /**
//  * Offer száma
//  */
// oid: string | null
// /**
//  * FAR státusza
//  */
// far: string
// /**
//  * számlázás státusza
//  */
// invoiced: string
// /**
//  * Számla száma
//  */
// invoice_number: string | null
// /**
//  * Megjegyzés
//  */
// note: string | null
// /**
//  * Kifizetés státusza
//  */
// paid: string
// /**
//  * Adott-e a résztvevők email címe
//  */
// anonym: string
// /**
//  * FAR szükséges-e
//  */
// is_far_required: string | null
// /**
//  * QR
//  */
// qr_eval: string | null
// export const orderPackEventValidator = new DataHandler<order_pack_event>({
// 	tableName: 'order_pack_event',
// 	server: {
// 		fields: {
// 			customer_name: {
// 				calc: ({ data }) => {
// 					return 'Pending...';
// 				},
// 				type: {
// 					kind: 'string',
// 				},
// 				displayName: 'Customer Name',
// 				hidden: false,
// 			},
// 			inv_customer_name: {
// 				calc: ({ data }) => {
// 					return 'Pending...';
// 				},
// 				type: {
// 					kind: 'string',
// 				},
// 				displayName: 'Invoice Customer Name',
// 				hidden: false,
// 			},
// 			contact_name: {
// 				calc: ({ data }) => {
// 					return 'Pending...';
// 				},
// 				type: {
// 					kind: 'string',
// 				},
// 				displayName: 'Contact Name',
// 				hidden: false,
// 			},
// 		},
// 	},
// 	fields: {
// 		id: {
// 			form: z.string().min(1).pipe(z.coerce.number()),
// 			api: z.number(),
// 			displayName: 'ID',
// 			type: {
// 				kind: 'number',
// 			},
// 		},
// 		pack_event: {
// 			form: z.string().min(1).pipe(z.coerce.number()),
// 			api: z.number(),
// 			displayName: 'Pack Event',
// 			type: {
// 				kind: 'number',
// 			},
// 		},
// 		customer: {
// 			form: z.string().min(1).pipe(z.coerce.number()),
// 			api: z.number(),
// 			displayName: 'Customer',
// 			type: {
// 				kind: 'connected',
// 				connected_table: 'customer',
// 				connected_label: 'name',
// 				connected_value: 'id',
// 			},
// 		},
// 		inv_customer: {
// 			form: z.string().min(1).pipe(z.coerce.number()),
// 			api: z.number(),
// 			displayName: 'Invoice Customer',
// 			type: {
// 				kind: 'connected',
// 				connected_table: 'customer',
// 				connected_label: 'name',
// 				connected_value: 'id',
// 			},
// 		},
// 		contact: {
// 			form: z.string().nullable().pipe(z.coerce.number().nullable()),
// 			api: z.number().nullable(),
// 			displayName: 'Contact',
// 			type: {
// 				kind: 'connected',
// 				connected_table: 'customer_contact'
// 				connected_label: 'display_name',
// 				connected_value: 'id',
// 			},
// 		},
// 		expected_amount: {
// 			form: z.string().pipe(z.coerce.number()),
// 			api: z.number(),
// 			displayName: 'Expected Amount',
// 			type: {
// 				kind: 'number',
// 			},
// 		},
// 		expected_amount_currency: {
// 			form: z.string(),
// 			api: z.string(),
// 			displayName: 'Expected Amount Currency',
// 			type: {
// 				kind: 'string',
// 			},
// 		},
// 		expected_amount_HUF: {
// 			form: z.string().nullable().pipe(z.coerce.number().nullable()),
// 			api: z.number().nullable(),
// 			displayName: 'Expected Amount HUF',
// 			type: {
// 				kind: 'number',
// 			},
// 		},
// 		expected_amount_EUR: {
// 			form: z.string().nullable().pipe(z.coerce.number().nullable()),
// 			api: z.number().nullable(),
// 			displayName: 'Expected Amount EUR',
// 			type: {
// 				kind: 'number',
// 			},
// 		},
// 		vat: {
// 			form: z.string().nullable().pipe(z.coerce.number().nullable()),
// 			api: z.number().nullable(),
// 			displayName: 'VAT',
// 			type: {
// 				kind: 'number',
// 			},
// 		},
// 		payment_date: {
// 			form: z.string().nullable().pipe(z.coerce.date().nullable()),
// 			api: z.string().nullable(),
// 			displayName: 'Payment Date',
// 			type: {
// 				kind: 'date',
// 			},
// 		},
// 		actual_report_date: {
// 			form: z.string().nullable().pipe(z.coerce.date().nullable()),
// 			api: z.string().nullable(),
// 			displayName: 'Actual Report Date',
// 			type: {
// 				kind: 'date',
// 			},
// 		},
// 		status: {
// 			form: z.string(),
// 			api: z.string(),
// 			displayName: 'Status',
// 			type: {
// 				kind: 'string',
// 			},
// 		},
// 		qoute: {
// 			form: z.string(),
// 			api: z.string(),
// 			displayName: 'Qoute',
// 			type: {
// 				kind: 'string',
// 			},
// 		},
// 		qoute_number: {
// 			form: z.string().nullable(),
// 			api: z.string().nullable(),
// 			displayName: 'Qoute Number',
// 			type: {
// 				kind: 'string',
// 			},
// 		},
// 		po: {
// 			form: z.string(),
// 			api: z.string(),
// 			displayName: 'PO',
// 			type: {
// 				kind: 'string',
// 			},
// 		},
// 		po_number: {
// 			form: z.string().nullable(),
// 			api: z.string().nullable(),
// 			displayName: 'PO Number',
// 			type: {
// 				kind: 'string',
// 			},
// 		},
// 		case_id: {
// 			form: z.string().nullable(),
// 			api: z.string().nullable(),
// 			displayName: 'Case ID',
// 			type: {
// 				kind: 'string',
// 			},
// 		},
// 		oid: {
// 			form: z.string().nullable(),
// 			api: z.string().nullable(),
// 			displayName: 'OID',
// 			type: {
// 				kind: 'string',
// 			},
// 		},
// 		far: {
// 			form: z.string(),
// 			api: z.string(),
// 			displayName: 'FAR',
// 			type: {
// 				kind: 'string',
// 			},
// 		},
// 		invoiced: {
// 			form: z.string(),
// 			api: z.string(),
// 			displayName: 'Invoiced',
// 			type: {
// 				kind: 'string',
// 			},
// 		},
// 		invoice_number: {
// 			form: z.string().nullable(),
// 			api: z.string().nullable(),
// 			displayName: 'Invoice Number',
// 			type: {
// 				kind: 'string',
// 			},
// 		},
// 		note: {
// 			form: z.string().nullable(),
// 			api: z.string().nullable(),
// 			displayName: 'Note',
// 			type: {
// 				kind: 'string',
// 			},
// 		},
// 		paid: {
// 			form: z.string(),
// 			api: z.string(),
// 			displayName: 'Paid',
// 			type: {
// 				kind: 'string',
// 			},
// 		},
// 		anonym: {
// 			form: z.string(),
// 			api: z.string(),
// 			displayName: 'Anonym',
// 			type: {
// 				kind: 'string',
// 			},
// 		},
// 		is_far_required: {
// 			form: z.string().nullable(),
// 			api: z.string().nullable(),
// 			displayName: 'Is Far Required',
// 			type: {
// 				kind: 'string',
// 			},
// 		},
// 		qr_eval: {
// 			form: z.string().nullable(),
// 			api: z.string().nullable(),
// 			displayName: 'QR Eval',
// 			type: {
// 				kind: 'string',
// 			},
// 		},

// });

// order_pack_unit_event

// order_participant

// participant

// * Elsődleges kulcs
// *
// * @format uuid
// */
// id: number
// /**
// * Az ügyfél email címe (Ide kapják meg a kurzus információkat és az írott tananyagot)
// */
// email: string
// /**
// * Az ügyfél neve
// */
// name: string
// /**
// * Az ügyfél jelenlegi cégének azonosítója
// */
// customer: number | null

export const participantValidator = new DataHandler<participant>({
	tableName: 'participant',
	server: {
		fields: {
			customer_name: {
				calc: ({ data }) => {
					return 'Pending...';
				},
				type: {
					kind: 'string',
				},
				displayName: 'Customer Name',
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
		email: {
			form: z.string(),
			api: z.string(),
			displayName: 'Email',
			type: {
				kind: 'string',
			},
			filter: ({ target, data }: { target: string; data: participant }) => {
				if (!target) return true;
				return !!data.email?.toLowerCase().includes(target.toLowerCase());
			},
		},
		name: {
			form: z.string(),
			api: z.string(),
			displayName: 'Name',
			type: {
				kind: 'string',
			},
			filter: ({ target, data }) => {
				if (!target) return true;
				return !!data.name?.toLowerCase().includes(target.toLowerCase());
			},
		},
		customer: {
			form: z.string().nullable().pipe(z.coerce.number().nullable()),
			api: z.number().nullable(),
			displayName: 'Customer',
			type: {
				kind: 'connected',
				connected_table: 'customer',
				connected_label: 'name',
				connected_value: 'id',
			},
		},
	},
});
