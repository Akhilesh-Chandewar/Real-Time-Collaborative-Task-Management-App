const Task = require("../models/taskModel");
const ErrorHandler = require("../utils/errorhandler");

exports.addTasks = async (req, res, next) => {
    try {
      const { title, description } = req.body;
      if (!title || !description) {
        return next(new Error("Enter required data", 400));
      }
      await Task.create({
        title,
        description,
        userId: req.user._id,
      });
      res.status(201).json({
        success: true,
        message: "Task created",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  };
  
  exports.addTasksByAdmin = async (req, res, next) => {
    try {
      const { title, description , userid } = req.body;
      if (!title || !description , !userid) {
        return next(new Error("Enter required data", 400));
      }
      await Task.create({
        title,
        description,
        userId: userid,
      });
      res.status(201).json({
        success: true,
        message: "Task created",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  };

exports.getUserTasks = async(req,res, next) => {
    try{
        const userid = req.user._id;
        const tasks = await Task.find({userId : userid});
        if(!tasks){
            return next(new ErrorHandler("No tasks found", 404));
        }
        res.status(200).json({
            success: true,
            tasks
        });
    }
    catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}

exports.deleteUserTasks = async(req,res,next) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.taskId);
        if (!task) {
            return next(new ErrorHandler("No tasks found", 404));
        }
        res.status(200).json({
            success: true,
            message: "Task deleted"
        });
    }
    catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}


exports.updateUserTasks = async(req,res, next) => {
    try{
        const task = await Task.findById(req.params.taskId);
        if (!task) {
            return next(new ErrorHandler("No tasks found", 404));
        }

        if (task.userId.toString() !== req.user._id.toString()) {
            return next(new ErrorHandler("Unauthorized", 401));
        };

        task.title = req.body.title ?? task.title;
        task.description = req.body.description ?? task.description;
        task.status = req.body.status ?? task.status;

        await task.save();
        res.status(200).json({
            success: true,
            message: "Task updated"
        });

    }
    catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}
