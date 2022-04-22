"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const mongoose = require("mongoose");
const config_1 = require("@nestjs/config");
const connection = new config_1.ConfigService().get('MONGO_URI');
console.log(connection);
if (connection === undefined) {
    throw new Error('MONGO_URI is not defined');
}
exports.databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: () => mongoose.connect(connection),
    },
];
//# sourceMappingURL=database.providers.js.map