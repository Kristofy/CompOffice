import { envSchema } from '@/server/env-schema';

export const ENV = envSchema.parse(process.env);
