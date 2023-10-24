const UserController = require("../controllers/user.controller");
const { validateSchema, schemas } = require("../middlewares/validateSchema");

const router = require("express").Router();

router.post(
  "/",
  validateSchema(schemas.user.createUser),
  UserController.createUser
);

module.exports = router;
