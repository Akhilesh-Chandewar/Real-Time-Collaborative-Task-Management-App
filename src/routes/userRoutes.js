const router = require("express").Router();
const {signup , login , getAllRegularUsers, getUserRole} = require("../controllers/userControllers");
const { isAuthenticated , authorizeRoles } = require("../middlewares/auth");

router.post("/signup", signup);
router.post("/login" , login);
router.post("/getuserrole", isAuthenticated, authorizeRoles("admin" , "regular"), getUserRole);
router.post("/getallregularuser", isAuthenticated, authorizeRoles("admin") , getAllRegularUsers);

module.exports = router;

