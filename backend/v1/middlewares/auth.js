const { verifyJWTToken } = require("../../utils/jwt");

const authorize = (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ message: "Missing Authorization Token" });
    }
    const { success, payload } = verifyJWTToken(token);
    if (!success) {
      return res.status(403).json({ message: "Invalid Authorization Token" });
    }

    req.loggedInUser = payload;
    next();
  } catch (err) {
    console.error("Authorization Middleware Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const checkAdmin = (req, res, next) => {
    if (req.loggedInUser.role !== "admin") {
      return res.status(403).json({ message: "Admin privileges required" });
    }
    next();
};

module.exports = { authorize, checkAdmin };
