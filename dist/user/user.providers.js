"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProviders = void 0;
const user_schema_1 = require("./schemas/user.schema");
exports.userProviders = [
    {
        provide: 'UserModel',
        useFactory: (connection) => connection.model('User', user_schema_1.UserSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=user.providers.js.map