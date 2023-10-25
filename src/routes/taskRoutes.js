const router = require("express").Router();
const {getUserTasks , addTasks , deleteUserTasks , updateUserTasks , addTasksByAdmin} = require("../controllers/taskControllers");
const { isAuthenticated , authorizeRoles } = require("../middlewares/auth");

router.post("/getusertasks", isAuthenticated, authorizeRoles("regular" , "admin"),   getUserTasks);
router.post("/addtasks", isAuthenticated, authorizeRoles("admin" , "regular") , addTasks);
router.post("/addtasksbyadmin", isAuthenticated, authorizeRoles("admin") , addTasksByAdmin);
router.post("/updateusertasks/:taskId", isAuthenticated, authorizeRoles( "admin" , "regular"), updateUserTasks);
router.post("/deleteusertasks/:taskId", isAuthenticated, authorizeRoles( "admin" , "regular"), deleteUserTasks);

module.exports = router;