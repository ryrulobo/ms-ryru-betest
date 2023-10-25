const router = require("express").Router();
const userRoute = require("./user.route");

router.get("/", (req, res) => {
  res.status(200).json({
    message: "🚀 user ms-test",
  });
});
router.use("/users", userRoute);

module.exports = router;
