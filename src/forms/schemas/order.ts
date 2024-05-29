import { participant } from '@prisma/client';
import { DataHandler } from '../type-info';
import { z } from 'zod';
import { UseQueryResult } from '@tanstack/react-query';
import { trpc } from '@/trpc/client/client';

// customer

// customer contact

// industry

// order_pack_event

// order_pack_unit_event

// order_participant

// participant

export const participantValiadator = new DataHandler<participant>({
	server: {
		useQuery: trpc.get.participants.useQuery,
		fields: {
			test_elek: {
				calc: ({ data }: { data: participant }) => {
					return data.name;
				},
				type: {
					kind: 'string',
				},
			},
		},
	},
	fields: {
		id: {
			form: z.string().min(1).pipe(z.coerce.number()),
			api: z.number().min(0),
			type: {
				kind: 'number',
			},
		},
		email: {
			form: z.string().email(),
			api: z.string().email(),
			type: {
				kind: 'string',
			},
			filter({ target, data }) {
				return data.email.toLowerCase().includes(target.toLowerCase());
			},
		},
		name: {
			form: z.string(),
			api: z.string(),
			type: {
				kind: 'string',
			},
		},
		customer: {
			form: z.string().min(1).pipe(z.coerce.number()),
			api: z.number(),
			type: {
				kind: 'number',
			},
		},
	},
	additional: {
		test: {
			calc: ({ data }: { data: participant }) => {
				return 'Hello World!';
			},
			header: ({}) => {
				return 'Test column';
			},
		},
	},
});
