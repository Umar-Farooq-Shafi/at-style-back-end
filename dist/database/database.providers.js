"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const mongoose = require("mongoose");
const config_service_1 = require("../config/config.service");
exports.databaseProviders = [
    {
        inject: [config_service_1.ConfigService],
        provide: 'DATABASE_CONNECTION',
        useFactory: (configService) => mongoose.connect(configService.get('MONGO_URI')),
    },
];
//# sourceMappingURL=database.providers.js.map