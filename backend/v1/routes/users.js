const express = require('express');
const { authorize, checkAdmin } = require('../middlewares/auth');
const router = express.Router();
const { GetUsersController, UpdateUserController, DeleteUserController, AddUserController } = require('../controllers/users');

router.use(authorize);

router.get("/", GetUsersController);
router.post("/", checkAdmin, AddUserController)
router.put("/:userId", UpdateUserController);
router.delete("/:userId", checkAdmin, DeleteUserController)

module.exports = router;