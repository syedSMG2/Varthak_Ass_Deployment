"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email format',
        },
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (value) => /^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W).{6,}$/.test(value),
            message: "Password must contain at least one numeric digit, one alphabet character, one symbol and atleast 6 char long",
        },
    },
    role: {
        type: [String],
        enum: ["VIEWER", "CREATOR", "VIEW_ALL"],
        default: ["VIEWER"],
    },
});
const UserModel = mongoose_1.default.model('Varthak_User', UserSchema);
exports.UserModel = UserModel;
