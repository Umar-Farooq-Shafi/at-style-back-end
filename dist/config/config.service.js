"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const dotenv = require("dotenv");
const fs = require("fs");
const Joi = require("@hapi/joi");
class ConfigService {
    constructor(filePath) {
        const config = dotenv.parse(fs.readFileSync(filePath));
        this.envConfig = this.validate(config);
    }
    validate(config) {
        const envVariablesSchema = Joi.object({
            NODE_ENV: Joi.string()
                .valid('development', 'production', 'test', 'production-test')
                .default('development'),
            PORT: Joi.number().default(3000),
            MONGO_URI: Joi.string().required(),
        });
        const { error, value: validatedEnvConfig } = envVariablesSchema.validate(config);
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return validatedEnvConfig;
    }
    get(key) {
        return this.envConfig[key];
    }
}
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map