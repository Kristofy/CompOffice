import { fromZodIssue } from 'zod-validation-error';
import z from "zod";

export const envSchema = z.object({
  DATABASE_URL: z.string(),
  PRODUCTION: z.string().default("0").refine((val) => val === "0" || val === "1", {
    message: "PRODUCTION must be 0 or 1",
  }).transform((val) => val === "1"),
});


const getEnvIssues = (): z.ZodIssue[] | void => {
  const result = envSchema.safeParse(process.env);
  if (!result.success) return result.error.issues;
};


export function validateEnv() {
    const issues = getEnvIssues();

    if (issues) {
      console.error("Invalid environment variables, check the errors below!");
      // zodError = fromZodError(issues);
      issues.forEach((issue) => {
        const zodValidationError = fromZodIssue(issue);
        console.error(zodValidationError.toString());
      });
      process.exit(-1);
    }

    console.log("The environment variables are valid!");
}