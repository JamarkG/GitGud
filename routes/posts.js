const express = require("express");
const db = require("../db/models");
const router = express.Router();
const { csrfProtection, asyncHandler } = require("./utils");
const { check, validationResult } = require("express-validator");
const { loginUser, logoutUser } = require("../auth");

router.get(
  "/posts/:id(\\d+)",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    console.log(postId);
    const post = await db.Post.findByPk(postId, {
      include: Comments,
    }); // come back and include comments table

    if (post) {
      res.render("post-detail", {
        title: post.title,
        post,
        csrfToken: req.csrfToken(),
      });
    } else {
      res.send("<h2>Post could not be found</h2>");
    }
  })
);

router.post(
  "/posts/:id(\\d+)",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = await db.Post.findByPk(postId);
    await post.destroy();
    res.redirect("/");
  })
);

module.exports = router;
