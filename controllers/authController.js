const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { createJWT, attachCookiesToResponse } = require("../utils");
const register = async (req, res) => {
  const { email, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email Already Exists");
  }

  //   first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";
  const user = await User.create({ name, email, password, role });
  //   Generate Token
  const essentialInfo = { name: user.name, userId: user._id, role: user.role };
  attachCookiesToResponse({ res, user: essentialInfo });
  res.status(StatusCodes.CREATED).json({ user: essentialInfo });
};
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Creadentials");
  }
  const isPassword = await user.comparePassword(password);
  if (!isPassword) {
    throw new CustomError.UnauthenticatedError("Invalid Creadentials");
  }
  const essentialInfo = { name: user.name, userId: user._id, role: user.role };
  attachCookiesToResponse({ res, user: essentialInfo });
  res.status(StatusCodes.CREATED).json({ user: essentialInfo });
};
const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

module.exports = {
  register,
  login,
  logout,
};
