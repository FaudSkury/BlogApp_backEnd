import { RequestHandler } from "express";
import User, { IUser } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body as IUser;

  let foundUser: IUser;

  try {
    foundUser = (await User.findOne({ email: email })) as IUser;
  } catch (error) {
    return next(error);
  }

  if (!foundUser) {
    return res.status(404).json({ message: "User not found, try signing up" });
  }

  let passwordIsValid = false;

  try {
    passwordIsValid = await bcrypt.compare(password, foundUser.password);
  } catch (error) {
    return next(error);
  }

  if (!passwordIsValid) {
    return res.status(403).json({ message: "Wrong credentials entered" });
  }

  let token: string;

  try {
    token = jwt.sign({ email: foundUser.email }, "secret_dont_share", {
      expiresIn: "1h",
    });
  } catch (error) {
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

export const signup: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body as IUser;

  let foundUser: IUser;

  try {
    foundUser = (await User.findOne({ email: email })) as IUser;
  } catch (error) {
    return next(error);
  }

  if (foundUser) {
    return res
      .status(409)
      .json({ message: "User exists already, try logging in" });
  }

  let hashdedPassword: string;

  try {
    hashdedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    return next(error);
  }

  const newUser = new User({ email: email, password: hashdedPassword });

  try {
    await newUser.save();
  } catch (error) {
    return next(error);
  }
  res.status(201).json({ message: `User ${newUser.email} created!` });
};
