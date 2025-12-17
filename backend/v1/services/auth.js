const { APIError } = require("../../utils/errors");
const { USERS } = require("../../constants/users");
const bcrypt = require("bcryptjs");

const checkPassword = async (user, password) => {
    const match = await bcrypt.compare(password, user.passwordHash);
    return match;
}

const loginUser = async (email, password) => {
    const user = USERS.find(u => u.email === email);

    if (!user) {
        throw new APIError("User not found", 404);
    }

    const isPasswordValid = await checkPassword(user, password);

    if (!isPasswordValid) {
        throw new APIError("Email or password is wrong", 401);
    }
    
    return user;
};

module.exports = { 
    loginUser,
};