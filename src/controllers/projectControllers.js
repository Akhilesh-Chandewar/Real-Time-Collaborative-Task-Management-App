const Project  = require('../models/projectModel');
const Task = require('../models/taskModel');
const User = require('../models/userModel');
const ErrorHandler = require("../utils/errorhandler");

// Create a new project
exports.createProject = async (req, res , next) => {
  try {
    const {title, description} = req.body;
    if(!title){
      return next(new Error("Enter requied data" , 400))
    }
    const project = new Project({ 
      title, 
      description, 
      createdBy : req.user._id,
      members : req.user._id
    });
    await project.save();
    res.status(201).json({
      success: true,
      message: "Project created",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// Get all projects
exports.getProjects = async (req, res) => {
  try {
    const userid = req.user._id;
    const projects = await Project.find({createdBy : userid});
    if(!projects){
      return next(new ErrorHandler("No tasks found", 404));
    }
    res.status(200).json({
      success: true,
      projects
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// Get a specific project by ID
exports.getProjectById = async (req, res , next) => {
  try {
    const projectId = req.params.projectid;
    const project = await Project.findById(projectId).populate("createdBy").populate("members");
    if (!project) {
      return next(new ErrorHandler("Project not found", 404));
    }
    res.status(200).json({
      success: true,
      project
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// Update a project by ID
exports.updateProject = async (req, res) => {
  try {
    const projectId = req.params.projectid;
    const {title , description} = req.body;
    const project = await Project.findByIdAndUpdate(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    project.title = title?? project.title;
    project.description = description ?? project.description;
    await project.save();
    res.status(200).json({
      success: true,
      message: "Task updated"
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// Delete a project by ID
exports.deleteProject = async (req, res, next) => {
  try {
    const projectid = req.params.projectid;
    const project = await Project.findByIdAndRemove(projectid);
    if (!project) {
      return next(new ErrorHandler(error.message, 500));
    }
    // You may want to delete associated tasks or handle them accordingly
    await Task.deleteMany({ _id: { $in: project.tasks } });
    res.status(200).json({
      success: true,
      message: "Task deleted"
  });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

exports.addProjectMember = async (req, res, next) => {
  try {
    const projectid = req.params.projectid;
    const userid = req.params.userid;
    const project = await Project.findByIdAndUpdate(projectid, { $addToSet: { members: userid } }, { new: true });
    console.log(project);
    if (!project) {
      return next(new ErrorHandler(error.message, 500));
    }
    fin
    res.status(200).json({
      success: true,
      message: "Member added"
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}

exports.removeProjectMember = async (req, res, next) => {
  try {
    const projectid = req.params.projectid;
    const userid = req.params.userid;
    const project = await Project.findByIdAndUpdate(projectid, { $pull: { members: userid } }, { new: true });
    if (!project) {
      return next(new ErrorHandler(error.message, 500));
    }
    const user = await Project.findById(userid);
    if (!user) {
      return next(new ErrorHandler(error.message, 404));
    }
    user.project = null;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Member removed successfully"
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}

exports.getProjectMembers = async (req, res, next) => {
  try {
    const projectid = req.params.projectid;
    const project = await Project.findById(projectid).populate("members");
    if (!project) {
      return next(new ErrorHandler(error.message, 404));
    }
    res.status(200).json({
      success: true,
      project
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}




