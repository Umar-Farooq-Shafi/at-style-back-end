"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseObjectPipe = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
let ParseObjectPipe = class ParseObjectPipe {
    transform(value) {
        if (!mongoose_1.Types.ObjectId.isValid(value)) {
            throw new common_1.BadRequestException('Invalid use id');
        }
        return new mongoose_1.Types.ObjectId(value);
    }
};
ParseObjectPipe = __decorate([
    (0, common_1.Injectable)()
], ParseObjectPipe);
exports.ParseObjectPipe = ParseObjectPipe;
//# sourceMappingURL=objectid.pipe.js.map