const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const createToken = (payload) =>
  // jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
const verifyToken = (token) => jwt.verify(token, JWT_SECRET);

module.exports = { createToken, verifyToken };
