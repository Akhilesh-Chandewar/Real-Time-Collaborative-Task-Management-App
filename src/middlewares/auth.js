const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorhandler");

exports.isAuthenticated = async (req, res, next) => {
  try {
    const {token} = req.body;
    if (!token) {
      return next(new ErrorHandler("Please login first" , 401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new ErrorHandler(
            `Role: ${req.user.role} is not allowed to access this resouce `,
            403
          )
        );
      }
      next();
  }
};
