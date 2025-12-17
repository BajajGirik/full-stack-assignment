const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const createJWTToken = (data) => {
  try {
    return jwt.sign(
        data,
        JWT_SECRET,
        { expiresIn: "1h" }
    );
  } catch (err) {
    return null;
  }
};

const verifyJWTToken = (token) => {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return { success: true, payload };
  } catch (err) {
    return { success: false };
  }
};

module.exports = { createJWTToken, verifyJWTToken };