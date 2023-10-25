const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");

exports.signup = async (req, res,next) => {
    try{
      const { username, email, password, admin } = req.body;
      if(!username || !email || !password){
        return next(new Error("Enter requied data" , 400))
      }
      const  user = await User.findOne({ email });
      if (user) {
        return next(new ErrorHandler("User already exists" , 400))
      }
      if(admin){
        await User.create({
          username,
          email,
          password,
          role : "admin"
        })
        res.status(200).json({
          success: true,
          message: `New admin created with Username ${username} and Email ${email}` 
        });
      }
      else{
        await User.create({
          username,
          email,
          password
        })
        res.status(200).json({
          success: true,
          message: `New user created with Username ${username} and Email ${email}` 
        });
      }
    }
    catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}

exports.login = async (req, res, next) => {
  try {
    const { email, password, admin } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("Please Enter Email & Password", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    if (admin) {
      if (user.role !== "admin") {
        return next(new ErrorHandler("You are not an admin", 401));
      }
      else {
        const isPasswordMatched = await user.comparePassword(password);
        if (!isPasswordMatched) {
          return next(new ErrorHandler("Invalid email or password", 401));
        }
        const token = await user.getJWTToken();
        res.status(200).json({
          success: true,
          message: `Welcome ${user.username}`,
          token
        });
      }
    } else{
      if (user.role !== "regular") {
        return next(new ErrorHandler("You are not a regular user", 401));
      }
      const isPasswordMatched = await user.comparePassword(password);
      if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
      }
    
    const token = await user.getJWTToken();
    res.status(200).json({
      success: true,
      message: `Welcome ${user.username}`,
      token
    });
  }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

exports.getAllRegularUsers = async (req, res, next) => {
  try {
    const users = await User.find({ role: "regular" });
    res.status(200).json({
      success: true,
      users
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}

exports.getUserRole = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("role");
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}