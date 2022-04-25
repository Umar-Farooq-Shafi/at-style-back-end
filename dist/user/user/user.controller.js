"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const rxjs_1 = require("rxjs");
const user_service_1 = require("./../user.service");
const user_dto_1 = require("./../dto/user.dto");
const validation_pipe_1 = require("../../pipes/validation.pipe");
const objectid_pipe_1 = require("../../pipes/objectid.pipe");
const public_decorator_1 = require("../../decorators/public.decorator");
const createUserSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    gender: Joi.string().valid('male', 'female').required(),
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
    }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    repeatPassword: Joi.ref('password'),
    phone: Joi.number().required(),
    referralCode: Joi.string(),
});
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async create(user) {
        const userExists = await this.userService.checkUserExists(user.name);
        if (userExists) {
            return common_1.HttpStatus.CONFLICT;
        }
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        await this.userService.create(user);
        return common_1.HttpStatus.CREATED;
    }
    findAll() {
        return (0, rxjs_1.of)(this.userService.findAll());
    }
    async findOne(id) {
        return this.userService.findOne(id);
    }
    async update(id, user) {
        user.updatedAt = new Date();
        return this.userService.update(id, user);
    }
    async delete(id) {
        await this.userService.delete(id);
        return common_1.HttpStatus.NO_CONTENT;
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.Header)('Cache-Control', 'none'),
    (0, common_1.UsePipes)(new validation_pipe_1.JoiValidationPipe(createUserSchema)),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', new objectid_pipe_1.ParseObjectPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', new objectid_pipe_1.ParseObjectPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', new objectid_pipe_1.ParseObjectPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
UserController = __decorate([
    (0, common_1.Controller)('/api/user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map