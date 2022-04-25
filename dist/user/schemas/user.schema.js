"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    name: String,
    gender: String,
    email: {
        type: String,
        default: '',
    },
    phone: Number,
    password: String,
    referralCode: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
exports.UserSchema.pre('aggregate', function () {
    this.model.aggregate([
        {
            $project: {
                _id: {
                    $toString: '$_id',
                },
            },
        },
    ]);
});
//# sourceMappingURL=user.schema.js.map