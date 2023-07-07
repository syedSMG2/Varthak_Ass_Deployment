"use strict";
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
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const authRouter = express_1.default.Router();
authRouter.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, role } = req.body;
        const user = yield (0, auth_controller_1.register)(name, email, password, role);
        return res.send({
            data: user,
        });
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).send({
            error: err.message || 'Something went wrong',
        });
    }
}));
authRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const { user, token } = yield (0, auth_controller_1.login)(email, password);
        return res.send({
            data: {
                token,
                user,
            },
        });
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).send({
            error: err.message || 'Something went wrong',
        });
    }
}));
exports.default = authRouter;
