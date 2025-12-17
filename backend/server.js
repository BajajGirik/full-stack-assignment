// BACKEND STARTER CODE (server.js)
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// "admin" can perform CRUD operations (password)
// "user" can edit his own profile and view all profiles
// search and pagination

app.use("/api/v1", require("./v1/routes"))

app.listen(3001, () => {
    console.log('Server running on port 3001');
});


module.exports = app;
