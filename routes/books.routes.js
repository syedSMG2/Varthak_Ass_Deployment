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
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const book_model_1 = require("../models/book.model");
const bookRouter = express_1.default.Router();
bookRouter.post('/books', auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body, "reqqqqqqqqboooooooodyyyyyyyyyyy");
        const { title, author, user } = req.body;
        console.log(user, "userrrrrrrrrrrrrrr");
        const roles = user.role;
        const checkrole = ["CREATOR"];
        if (!roles || !checkrole.some((role) => roles.includes(role))) {
            return res.status(400).json({ message: 'Unauthorized' });
        }
        else {
            console.log(user._id, "userIDDDDDDDDDDDDDDDDDD");
            const book = new book_model_1.BookModel({ title, author, user_id: user._id });
            yield book.save();
            res.status(200).json(book);
        }
    }
    catch (error) {
        console.error('Error creating book', error);
        res.status(500).json({ error: error.message || 'Server error' });
    }
}));
bookRouter.get('/books', auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body.user;
        const { old } = req.query;
        const createdAtFilter = old === '1' ? { $lte: new Date(Date.now() - 600000) } : req.query.new === '1' ? { $gt: new Date(Date.now() - 600000) } : {};
        const checkrole = ["VIEWER", "VIEW_ALL"];
        const roles = user.role;
        if (!roles || !checkrole.some((role) => roles.includes(role))) {
            return res.status(400).json({ message: 'Unauthorized' });
        }
        else {
            const checkrole1 = ["VIEW_ALL"];
            if (!(Object.keys(createdAtFilter).length === 0)) {
                if (!roles || !checkrole.some((role) => roles.includes(role))) {
                    const books = yield book_model_1.BookModel.find({ createdAt: createdAtFilter, user_id: user._id });
                    return res.status(200).json(books);
                }
                else {
                    const books = yield book_model_1.BookModel.find({ createdAt: createdAtFilter });
                    return res.status(200).json(books);
                }
            }
            else {
                const books = yield book_model_1.BookModel.find();
                return res.status(200).json(books);
            }
        }
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).send({
            error: 'Something went wrong',
        });
    }
}));
exports.default = bookRouter;
