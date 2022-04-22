"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        default: '',
    },
    phone: {
        type: Number,
        default: 0,
    },
    password: String,
    createdAt: Date,
    updatedAt: Date,
});
//# sourceMappingURL=user.schema.js.map