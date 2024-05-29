import { prisma } from '@/server/prisma';
import { z } from 'zod';
import { t } from '@/trpc/server/trpc';
import { editRouter } from './edit';
import { createRouter } from './create';

export const postRouter = t.router({
	edit: editRouter,
	create: createRouter,
});
