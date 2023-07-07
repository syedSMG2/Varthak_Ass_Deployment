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
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../controllers/auth.controller");
function auth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const headers = req.headers;
            const authHeader = headers.authorization;
            console.log(authHeader, "authhhhhhhhHaederrr");
            if (authHeader) {
                const [prefix, token] = authHeader.split(" ");
                if (prefix === "Bearer" && token) {
                    try {
                        const user = yield (0, auth_controller_1.loggedUserAuth)(token);
                        req.body.user = user;
                        next();
                    }
                    catch (err) {
                        return res.status(400).send({
                            error: "Bad token",
                        });
                    }
                }
                else {
                    return res.status(400).send({
                        error: "Unidentified token provided",
                    });
                }
            }
            else {
                return res.status(400).send({
                    error: "Token not present",
                });
            }
        }
        catch (err) {
            console.error(err.message);
            return res.status(500).send({
                error: "Something went wrong",
            });
        }
    });
}
exports.default = auth;
