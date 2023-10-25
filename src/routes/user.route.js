const UserController = require("../controllers/user.controller");
const auth = require("../helpers/auth");
const authz = require("../helpers/authz");
const { validateSchema, schemas } = require("../middlewares/validateSchema");

const router = require("express").Router();

router.post(
  "/register",
  validateSchema(schemas.user.createUser),
  UserController.createUser
);
router.post("/login", validateSchema(schemas.user.login), UserController.login);

router.use(auth);
router.get("/", UserController.findAllUser);
router.delete("/user/:id", authz, UserController.deleteUser);
router.put("/user/:id", authz, UserController.updateUser);
router.get("/user/acc/:accountNumber", UserController.findByAccount);
router.get("/user/id/:identityNumber", UserController.findByIdentity);

module.exports = router;
