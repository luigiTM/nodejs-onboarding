import { envVarsSchema, envVarsSchemaType } from "./env-schema";

const env = ((): envVarsSchemaType => {
  const validateEnvVarsSchemaResult = envVarsSchema.safeParse(process.env);
  if (!validateEnvVarsSchemaResult.success)
    throw new Error(validateEnvVarsSchemaResult.error.toString());
  return validateEnvVarsSchemaResult.data;
})();
export default env;
