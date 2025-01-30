import { z } from "zod";

// Schema to validate .env file to ensure we have everything we need to run the app
export const envVarsSchema = z.object({
  NODE_ENV: z.string(),
  DEBUG: z.preprocess(
    (stringBool) => Boolean(stringBool === "true"),
    z.boolean(),
  ),
  PORT: z.preprocess(
    (port) => parseInt(port as string, 10),
    z.number().positive().max(10000),
  ),
  API_VERSION: z.preprocess(
    (api_version) => parseInt(api_version as string, 10),
    z.number().positive(),
  ),
  DATABASE_URL: z.preprocess((database_url) => database_url, z.string()),
  DATABASE_PORT: z.preprocess(
    (database_port) => parseInt(database_port as string, 10),
    z.number().positive().max(65535),
  ),
  DATABASE_USER: z.preprocess((database_user) => database_user, z.string()),
  DATABASE_PASSWORD: z.preprocess(
    (database_password) => database_password,
    z.string(),
  ),
  DATABASE: z.preprocess((database) => database, z.string()),
});

export type envVarsSchemaType = z.infer<typeof envVarsSchema>;
