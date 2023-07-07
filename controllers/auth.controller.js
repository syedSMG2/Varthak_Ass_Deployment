"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggedUserAuth = exports.login = exports.register = void 0;
const user_model_1 = require("../models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
console.log(JWT_SECRET_KEY, "keeeeeeeeeeeeeeeeeeeeeeeeeeeyyyyyyyyyyyyyyyyy");
function register(name, email, password, role) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(email);
        let existing = yield user_model_1.UserModel.findOne({
            email,
        });
        console.log(existing, "xx");
        if (existing) {
            throw new Error("User already exists with this email");
        }
        try {
            let user = yield user_model_1.UserModel.create({
                name,
                email,
                password,
                role
            });
            console.log(user, "controller user");
            user = user.toJSON();
            delete user.password;
            console.log(user, "controller user 2");
            return user;
        }
        catch (err) {
            throw new Error(err.message);
        }
    });
}
exports.register = register;
function login(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = yield user_model_1.UserModel.findOne({
            email,
        });
        if (!user) {
            throw new Error('User does not exist with the given email');
        }
        if (password !== user.password) {
            throw new Error('Password is incorrect');
        }
        user = user.toJSON();
        delete user.password;
        const token = jsonwebtoken_1.default.sign(user, JWT_SECRET_KEY);
        console.log(token);
        return { token, user };
    });
}
exports.login = login;
function loggedUserAuth(token) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = jsonwebtoken_1.default.verify(token, JWT_SECRET_KEY);
        return user;
    });
}
exports.loggedUserAuth = loggedUserAuth;
