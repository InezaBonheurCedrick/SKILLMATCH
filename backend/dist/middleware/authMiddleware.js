"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = require("../utils/AppError");
const User_1 = require("../models/User");
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new AppError_1.AppError('You are not logged in! Please log in to get access.', 401));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const currentUser = await User_1.User.findById(decoded.id);
        if (!currentUser) {
            return next(new AppError_1.AppError('The user belonging to this token no longer exists.', 401));
        }
        req.user = currentUser;
        next();
    }
    catch (err) {
        return next(new AppError_1.AppError('Invalid token. Please log in again!', 401));
    }
};
exports.protect = protect;
//# sourceMappingURL=authMiddleware.js.map