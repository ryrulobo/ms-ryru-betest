const { v4: uuidv4 } = require("uuid");
const User = require("../models/user.model");
const { generateAccountNumber } = require("../helpers/helpers");
const { hashPassword, comparePassword } = require("../helpers/bcrypt.js");

class UserController {
  static async createUser(req, res, next) {
    try {
      const { userName, emailAddress, password } = req.body;

      if (!userName) throw { name: "empty_username" };
      if (!emailAddress) throw { name: "empty_email" };
      if (!password) throw { name: "empty_password" };

      const userData = {
        userName,
        emailAddress,
        password: hashPassword(password),
        identityNumber: uuidv4(),
        accountNumber: generateAccountNumber(),
      };

      const user = new User(userData);
      const savedUser = await user.save();

      res.status(201).json({
        code: 201,
        message: `User ${savedUser.userName} has been created`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
