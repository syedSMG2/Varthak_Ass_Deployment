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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connect_1 = __importDefault(require("./db/connect"));
const dotenv = __importStar(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const books_routes_1 = __importDefault(require("./routes/books.routes"));
const morgan_1 = __importDefault(require("morgan"));
dotenv.config();
const port = process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
const loggerMiddleware = (0, morgan_1.default)('combined');
app.use(loggerMiddleware);
app.use(auth_routes_1.default);
app.use(books_routes_1.default);
app.get("/", (req, res) => {
    res.send("HELLO worldd");
});
(0, connect_1.default)()
    .then(() => {
    app.listen(port, () => {
        console.log(`Server listening on http://localhost:${port}`);
    });
}).catch((err) => {
    console.log('Server failed');
});
