const express = require("express");
const router = express.Router();

router.get("/health", (req, res) => res.status(200).json({ status: "OK" }));

router.use("/auth", require("./auth"));
router.use("/users", require("./users"));

module.exports = router;
