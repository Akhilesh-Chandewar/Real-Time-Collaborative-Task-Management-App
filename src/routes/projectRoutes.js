const router = require("express").Router();
const{createProject , getProjects, deleteProject , updateProject , getProjectById , addProjectMember , removeProjectMember , getProjectMembers}  = require("../controllers/projectControllers");
const { isAuthenticated , authorizeRoles } = require("../middlewares/auth");

router.post("/createproject", isAuthenticated, authorizeRoles("admin"), createProject);
router.post("/getprojects", isAuthenticated, authorizeRoles("admin"), getProjects);
router.post("/getprojectbyid/:projectid", isAuthenticated, authorizeRoles("admin") , getProjectById);
router.post("/deleteproject/:projectid", isAuthenticated, authorizeRoles("admin"), deleteProject);
router.post("/updateproject/:projectid", isAuthenticated, authorizeRoles("admin"), updateProject);
router.post("/addprojectmember/:projectid/:userid", isAuthenticated, authorizeRoles("admin"), addProjectMember);
router.post("/removeprojectmember/:projectid/:userid", isAuthenticated, authorizeRoles("admin"), removeProjectMember);
router.post("/getprojectmembers/:projectid", isAuthenticated, authorizeRoles("admin"), getProjectMembers);

module.exports = router;