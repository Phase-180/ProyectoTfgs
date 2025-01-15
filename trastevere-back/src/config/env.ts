import 'dotenv/config';
import * as joi from 'joi';

interface IEnv {
  PORT: number;
  DATABASE_URL: string;
  EXPIRES_IN: string;
  SECRET: string;
}
const envSchema = joi
  .object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    EXPIRES_IN: joi.string().required(),
    SECRET: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate({
  ...process.env,
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: IEnv = value;

export const envs: IEnv = {
  PORT: envVars.PORT,
  DATABASE_URL: envVars.DATABASE_URL,
  EXPIRES_IN: envVars.EXPIRES_IN,
  SECRET: envVars.SECRET,
};
