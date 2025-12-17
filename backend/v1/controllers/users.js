const { APIError } = require("../../utils/errors");
const {
  getPaginatedUsers,
  deleteUser,
  updateUser,
  addUser,
} = require("../services/users");

const GetUsersController = (req, res) => {
  try {
    const result = getPaginatedUsers(req.query.page, req.query.limit);

    res.status(200).json({
      message: "Users fetched successfully",
      data: result,
    });
  } catch (err) {
    if (err instanceof APIError) {
      return res.status(err.statusCode).json({ message: err.message });
    }
    console.error("Get Users Controller Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const AddUserController = (req, res) => {
  try {
    const user = addUser(req.body);
    res.status(201).json({
      message: "User added successfully",
      user,
    });
  } catch (err) {
    if (err instanceof APIError) {
      return res.status(err.statusCode).json({ message: err.message });
    }
    console.error("Add User Controller Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const UpdateUserController = (req, res) => {
  try {
    if (
      req.loggedInUser.role !== "admin" &&
      req.loggedInUser.id != req.params.userId
    ) {
      throw new APIError("You don't have permission to update this user", 403);
    }

    const user = updateUser(req.params.userId, req.body);
    res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (err) {
    if (err instanceof APIError) {
      return res.status(err.statusCode).json({ message: err.message });
    }
    console.error("Update User Controller Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const DeleteUserController = (req, res) => {
  try {
    deleteUser(req.params.userId);
    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (err) {
    if (err instanceof APIError) {
      return res.status(err.statusCode).json({ message: err.message });
    }
    console.error("Delete User Controller Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  AddUserController,
  GetUsersController,
  UpdateUserController,
  DeleteUserController,
};
