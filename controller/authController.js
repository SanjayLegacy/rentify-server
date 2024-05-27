const db = require("../models");
const bcrypt = require("bcrypt");
const jwtToken = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const Users = db.users;

const generateToken = (id, username) => {
  return jwtToken.sign({ username, id }, "abc123", { expiresIn: "1d" });
};

const getUserById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const user = await Users.findOne({ where: { id: id } });

  if (!user) {
    res.status(404);
    throw new Error(`User not found = ${id}`);
  }

  const { password, ...resultUser } = user.dataValues;
  res.status(200).send(resultUser);
});

const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, username, password, role, contactInfo } =
    req.body;
  const user = await Users.findOne({ where: { username: username } });

  if (user) {
    res.status(400).json({ error: "User already exist!" });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await Users.create({
    firstName: firstName,
    lastName: lastName,
    username: username,
    password: hashPassword,
    contactInfo: contactInfo,
    role: role,
  });

  if (newUser) {
    res.status(200).json("User Registered Successfully!");
  }
});

const userLogin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) {
    res.status(400).json({ error: "User doesn't exist!" });
    return;
  } else {
    await bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        res.status(400).json({
          error: "The Password you have entered is wrong.....Try again!",
        });
        return;
      }
      res.status(200).json({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        contactInfo: user.contactInfo,
        jwtToken: generateToken({ username: user.username, id: user.id }),
      });
      return;
    });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { username, firstName, lastName, password, role, contactInfo } =
    req.body;
  const user = await Users.findOne({ where: { id: id } });

  if (user) {
    await bcrypt.hash(password, 10).then((hashPassword) => {
      Users.update(
        {
          username: username,
          firstName: firstName,
          lastName: lastName,
          password: hashPassword,
          role: role,
          contactInfo: contactInfo,
        },
        { where: { username: username } }
      );
      res.status(200).json("Updated Successfully!");
    });
  }
});

module.exports = {
  getUserById,
  registerUser,
  updateUser,
  userLogin,
  getCurrentUser,
};
