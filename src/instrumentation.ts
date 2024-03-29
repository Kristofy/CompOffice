
export async function register() {
    const { validateEnv } = await import("@/server/env-schema")
    validateEnv()
    const { ENV } = await import("@/server/env")
    console.log(`Running in ${ENV.PRODUCTION ? "PROD" : "DEV" } mode`) 
}