import { fromZodIssue } from 'zod-validation-error';
import z from 'zod';

const envSchema = z.object({
	DATABASE_URL: z.string(),

	AZURE_AD_CLIENT_ID: z.string(),

	AZURE_AD_CLIENT_SECRET: z.string(),

	AZURE_AD_TENANT_ID: z.string(),

	/**
	 * Make sure you are pointing to /api/auth
	 */
	NEXTAUTH_URL: z.string().url(),

	/**
	 * you can generate one with openssl rand -base64 32
	 */
	NEXTAUTH_SECRET: z.string(),

	PRODUCTION: z
		.string()
		.default('0')
		.refine((val) => val === '0' || val === '1', {
			message: 'PRODUCTION must be 0 or 1',
		})
		.transform((val) => val === '1'),
});

const getEnvIssues = (): z.ZodIssue[] | void => {
	const result = envSchema.safeParse(process.env);
	if (!result.success) return result.error.issues;
};

export function validateEnv() {
	const issues = getEnvIssues();

	if (issues) {
		console.error('Invalid environment variables, check the errors below!');
		// zodError = fromZodError(issues);
		issues.forEach((issue) => {
			const zodValidationError = fromZodIssue(issue);
			console.error(zodValidationError.toString());
		});
		process.exit(-1);
	}

	console.log('The environment variables are valid!');
}
