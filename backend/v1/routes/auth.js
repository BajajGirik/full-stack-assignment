const express = require("express");
const { LoginController } = require("../controllers/auth");
const router = express.Router();

router.post("/login", LoginController);

module.exports = router;
