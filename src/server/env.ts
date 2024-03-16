import { envSchema } from "./validate-env";


export const ENV = envSchema.parse(process.env);

