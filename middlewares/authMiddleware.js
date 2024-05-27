const db = require("../models");
const { verify } = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const validateToken = asyncHandler(async (req, res, next) => {
  const Users = db.users;
  const accessToken = req.header("authorization");

  if (!accessToken) return res.json({ error: "User not logged in!" });

  try {
    const validToken = verify(accessToken, "abc123");

    req.user = await Users.findOne({
      where: { username: validToken.id.username },
      attributes: { exclude: ["password"] },
    });

    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
});

module.exports = { validateToken };
