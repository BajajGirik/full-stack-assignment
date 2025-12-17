const OBJ = require("../../constants/users");
const { APIError } = require("../../utils/errors");
const bcrypt = require("bcryptjs");
const USERS = OBJ.USERS;
const NEXT_ID = OBJ.NEXT_ID;

const getPaginatedUsers = (page = 1, limit = 10) => {
  return {
    users: USERS.slice((page - 1) * limit, page * limit),
    count: USERS.length,
  };
};

const addUser = (userData) => {
  const existingUser = USERS.find(u => u.email === userData.email);
  if (existingUser) {
    throw new APIError("Email already in use", 409);
  }

  const newUser = {
    id: NEXT_ID, // USERS.length + 1
    name: userData.name,
    email: userData.email,
    password: bcrypt.hashSync(userData.password, 10),
    role: "user",
  };

  USERS.push(newUser);
  OBJ.NEXT_ID++;

  return newUser;
};

const updateUser = (userId, userData) => {
  const user = USERS.find(u => u.id == userId);
  if (!user) {
    throw new APIError("User not found", 404);
  }

  if (userData.name) {
    user.name = userData.name;
  }

  return user;
};

const deleteUser = (userId) => {
  const userIndex = USERS.findIndex(u => u.id == userId);
  if (userIndex === -1) {
    throw new APIError("User not found", 404);
  }

  USERS.splice(userIndex, 1);
}

module.exports = {
  getPaginatedUsers,
  addUser,
  updateUser,
  deleteUser
};