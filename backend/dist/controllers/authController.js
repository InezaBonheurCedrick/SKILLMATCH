"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.changePassword = exports.signin = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const catchAsync_1 = require("../utils/catchAsync");
const AppError_1 = require("../utils/AppError");
const signToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: (process.env.JWT_EXPIRES_IN || '90d')
    });
};
exports.signup = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const newUser = await User_1.User.create({
        email: req.body.email,
        password: req.body.password,
    });
    newUser.password = undefined;
    const token = signToken(newUser._id.toString());
    res.status(201).json({
        status: 'success',
        token,
        data: { user: newUser }
    });
});
exports.signin = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppError_1.AppError('Please provide email and password!', 400));
    }
    const user = await User_1.User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError_1.AppError('Incorrect email or password', 401));
    }
    const token = signToken(user._id.toString());
    res.status(200).json({
        status: 'success',
        token,
    });
});
exports.changePassword = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const user = await User_1.User.findById(req.user.id).select('+password');
    if (!user) {
        return next(new AppError_1.AppError('User no longer exists.', 404));
    }
    if (!(await user.correctPassword(req.body.oldPassword, user.password))) {
        return next(new AppError_1.AppError('Your current password is wrong', 401));
    }
    user.password = req.body.newPassword;
    await user.save();
    const token = signToken(user._id.toString());
    res.status(200).json({
        status: 'success',
        token,
        message: 'Password changed successfully!'
    });
});
const logout = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Logged out successfully. Please clear your token.',
    });
};
exports.logout = logout;
//# sourceMappingURL=authController.js.map