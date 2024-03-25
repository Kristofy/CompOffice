import { participant } from '@prisma/client';
import { createValidator } from '../type-info';
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

export const participantValiadator = createValidator<participant>({
	form: {},
	get: {
		useQuery: trpc.get.participants.useQuery,
	},
	schema: {
		id: {
			form: z.string().min(1).pipe(z.coerce.number()),
			api: z.number().min(0),
			type: 'number',
		},
		email: {
			form: z.string().email(),
			api: z.string().email(),
			type: 'string',
			filter(target, data) {
				return data.email.toLowerCase().includes(target.toLowerCase());
			},
		},
		name: {
			form: z.string(),
			api: z.string(),
			type: 'string',
		},
		customer: {
			form: z.string().min(1).pipe(z.coerce.number()),
			api: z.number(),
			type: 'number',
		},
	},
});
