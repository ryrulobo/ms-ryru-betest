const User = require("../models/user.model");

// authorize PUT and DELETE method for each user
const authz = async (req, res, next) => {
  try {
    if (req.method === "PUT" || req.method === "DELETE") {
      const findUser = await User.findById(req.params.id);
      if (!findUser) throw { name: "user_not_found" };

      if (String(req.user.id) === String(findUser._id)) {
        next();
      } else {
        throw { name: "forbidden" };
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authz;
