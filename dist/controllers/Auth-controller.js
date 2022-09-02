"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.login = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = async (req, res, next) => {
    const { email, password } = req.body;
    let foundUser;
    try {
        foundUser = (await User_1.default.findOne({ email: email }));
    }
    catch (error) {
        return next(error);
    }
    if (!foundUser) {
        return res.status(404).json({ message: "User not found, try signing up" });
    }
    let passwordIsValid = false;
    try {
        passwordIsValid = await bcrypt_1.default.compare(password, foundUser.password);
    }
    catch (error) {
        return next(error);
    }
    if (!passwordIsValid) {
        return res.status(403).json({ message: "Wrong credentials entered" });
    }
    let token;
    try {
        token = jsonwebtoken_1.default.sign({ email: foundUser.email }, "secret_dont_share", {
            expiresIn: "1h",
        });
    }
    catch (error) {
        return next(error);
    }
    if (token) {
        return res.status(200).json({
            message: "User Loged In",
            token: token,
            userName: foundUser.email,
        });
    }
};
exports.login = login;
const signup = async (req, res, next) => {
    const { email, password } = req.body;
    let foundUser;
    try {
        foundUser = (await User_1.default.findOne({ email: email }));
    }
    catch (error) {
        return next(error);
    }
    if (foundUser) {
        return res
            .status(409)
            .json({ message: "User exists already, try logging in" });
    }
    let hashdedPassword;
    try {
        hashdedPassword = await bcrypt_1.default.hash(password, 12);
    }
    catch (error) {
        return next(error);
    }
    const newUser = new User_1.default({ email: email, password: hashdedPassword });
    try {
        await newUser.save();
    }
    catch (error) {
        return next(error);
    }
    res.status(201).json({ message: `User ${newUser.email} created!` });
};
exports.signup = signup;
