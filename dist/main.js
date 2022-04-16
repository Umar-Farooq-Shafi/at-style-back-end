"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
(async () => {
    (await core_1.NestFactory.create(app_module_1.AppModule)).listen(3000);
})();
//# sourceMappingURL=main.js.map