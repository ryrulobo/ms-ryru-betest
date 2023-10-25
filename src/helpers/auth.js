const { verifyToken } = require("./jwt");
const User = require("../models/user.model");

const auth = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) throw { name: "unauthorized" };

    const payload = verifyToken(access_token);
    const userCheck = await User.findById(payload.id);
    if (!userCheck) throw { name: "unauthorized" };

    req.user = {
      id: userCheck.id,
      userName: userCheck.userName,
    };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = auth;
