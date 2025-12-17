const { APIError } = require("../../utils/errors");
const { createJWTToken } = require("../../utils/jwt");
const { loginUser } = require("../services/auth");

const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);
    const token = createJWTToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    res.status(200).json({
      message: "Login Successful",
      user,
      token,
    });
  } catch (err) {
    if (err instanceof APIError) {
      return res.status(err.statusCode).json({ message: err.message });
    }
    console.error("Login Controller Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  LoginController,
};
