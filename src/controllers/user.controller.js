const { v4: uuidv4 } = require("uuid");
const User = require("../models/user.model");
const { generateAccountNumber } = require("../helpers/helpers");
const { hashPassword, comparePassword } = require("../helpers/bcrypt.js");
const { createToken } = require("../helpers/jwt");

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

  static async login(req, res, next) {
    try {
      const { userName, password } = req.body;

      if (!userName) throw { name: "empty_username" };
      if (!password) throw { name: "empty_password" };

      const userCheck = await User.findOne({ userName });
      if (!userCheck) throw { name: "invalid_credential" };

      const validatePassword = comparePassword(password, userCheck.password);
      if (!validatePassword) throw { name: "invalid_credential" };

      const payload = {
        id: userCheck._id,
        userName: userCheck.userName,
      };
      const access_token = createToken(payload);

      res.status(200).json({
        code: 200,
        message: {
          userName: userCheck.userName,
          access_token,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async findAllUser(req, res, next) {
    try {
      const users = await User.find({}, "-password");
      res.status(200).json({
        code: 200,
        message: {
          users,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async findByAccount(req, res, next) {
    try {
      const { accountNumber } = req.params;
      if (!accountNumber) throw { name: "empty_account_number" };

      const findUser = await User.findOne({ accountNumber }, "-password");
      if (!findUser) throw { name: "user_not_found" };

      res.status(200).json({
        code: 200,
        message: {
          user: findUser,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async findByIdentity(req, res, next) {
    try {
      const { identityNumber } = req.params;
      if (!identityNumber) throw { name: "empty_identity_number" };

      const findUser = await User.findOne({ identityNumber }, "-password");
      if (!findUser) throw { name: "user_not_found" };

      res.status(200).json({
        code: 200,
        message: {
          user: findUser,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req, res, next) {
    try {
      if (Object.keys(req.body).length === 0) {
        throw { name: "empty_request_body" };
      }

      const { id } = req.params;
      const findUser = await User.findById(id);
      if (!findUser) throw { name: "user_not_found" };

      const { userName, emailAddress, password } = req.body;
      let updateData = {};

      // User should provide userName and password for updating data
      if (userName && password) {
        updateData.userName = userName;
        updateData.password = hashPassword(password);
        if (emailAddress) {
          updateData.emailAddress = emailAddress;
        }
      } else if (userName && !password) {
        throw { name: "empty_password" };
      }

      await User.updateOne({ _id: id }, updateData);

      // clear req.headers and req.user after updating data
      // user will need to relog their account
      req.headers = {};
      req.user = {};

      res.status(200).json({
        code: 200,
        message: `user successfully updated`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const findUser = await User.findById(id);
      if (!findUser) throw { name: "user_not_found" };

      await User.deleteOne({ _id: id });

      // clear req.headers and req.user after updating data
      // user will need to relog using other account/register new account
      req.headers = {};
      req.user = {};

      res.status(200).json({
        code: 200,
        message: `user ${findUser.userName} successfully deleted`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
