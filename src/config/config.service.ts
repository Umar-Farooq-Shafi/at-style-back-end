import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from '@hapi/joi';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    // Load environment variables from .env file if it exists
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validate(config);
  }

  /**
   * Ensures all needed variables are set,
   * and returns the validated JavaScript object
   * including the applied default values.
   */
  private validate(config: { [key: string]: string }): {
    [key: string]: string;
  } {
    // Validate schema
    const envVariablesSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'production-test')
        .default('development'),
      PORT: Joi.number().default(3000),
      MONGO_URI: Joi.string().required(),
    });

    const { error, value: validatedEnvConfig } =
      envVariablesSchema.validate(config);

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  // return the value of the environment variable
  get(key: string): string {
    return this.envConfig[key];
  }
}
