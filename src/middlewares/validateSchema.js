const Joi = require("joi");

const validateSchema = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      if (error.isJoi) {
        res.status(400).json({
          code: 400,
          message: error.details.map((err) => err.message).join(", "),
        });
      } else {
        next(error);
      }
    }
  };
};

const schemas = {
  user: {
    createUser: Joi.object({
      userName: Joi.string().required().min(6).max(20).messages({
        "string.empty": "Username should not be empty",
        "string.required": "Username should not be empty",
        "string.min": "Username must be at least 6 characters",
        "string.max": "Username must be less or equal to {#limit} characters",
      }),
      emailAddress: Joi.string()
        .email({ minDomainSegments: 2 })
        .required()
        .min(5)
        .max(255)
        .messages({
          "string.email": "Input must be a valid email",
          "string.empty": "Email should not be empty",
          "string.required": "Email should not be empty",
          "string.min": "Email must be at least 5 characters",
          "string.max": "Email must be less or equal to {#limit} characters",
        }),
      password: Joi.string()
        .required()
        .min(6)
        .max(20)
        .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
        .messages({
          "string.empty": "Password should not be empty",
          "string.required": "Password should not be empty",
          "string.min": "Password must be at least 6 characters",
          "string.max": "Password must be less or equal to {#limit} characters",
          "string.pattern.base":
            "Password must contain at least one uppercase letter, one lowercase letter, and one number",
        }),
    }),
  },
};

module.exports = { validateSchema, schemas };
