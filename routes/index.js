const express = require("express");
const db = require("../db/models");
const router = express.Router();
const { csrfProtection, asyncHandler } = require("./utils");
const { check, validationResult } = require("express-validator");
const { loginUser, logoutUser, requireAuth } = require("../auth");
const { names } = require("debug");


router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const topics = await db.Topic.findAll();
    if (req.session.auth) {
      const userId = req.session.auth.userId;
      const user = await db.User.findByPk(userId);
      res.render("index", {
        topics,
        title: `Welcome to Gitgud, ${user.firstName}!`,
      });
    } else {
      res.redirect("/users/login");
    }
  })
);


module.exports = router;
