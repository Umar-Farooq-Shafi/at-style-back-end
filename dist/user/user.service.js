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
exports.UserService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
let UserService = class UserService {
    constructor(userMode) {
        this.userMode = userMode;
    }
    async create(createUserDto) {
        const user = new this.userMode(createUserDto);
        return user.save();
    }
    async findAll() {
        return this.userMode.find().exec();
    }
    async findOne(id) {
        const user = await this.userMode.findById(id).exec();
        if (user === null) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async update(id, user) {
        const updatedUser = await this.userMode
            .findByIdAndUpdate(id, user, { new: true })
            .exec();
        if (updatedUser === null) {
            throw new common_1.NotFoundException('User not found');
        }
        return updatedUser;
    }
    async delete(id) {
        const deletedUser = await this.userMode
            .findByIdAndDelete(id, { new: true })
            .exec();
        if (deletedUser === null) {
            throw new common_1.NotFoundException('User not found');
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('UserModel')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map