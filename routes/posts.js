const express = require("express");
const db = require("../db/models");
const router = express.Router();
const { csrfProtection, asyncHandler } = require("./utils");
const { check, validationResult } = require("express-validator");
const { loginUser, logoutUser, requireAuth } = require("../auth");

router.get(
  "/:id(\\d+)",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = await db.Post.findByPk(postId, {
      include: ["Comments"],
    });
    // console.log(post);
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
  "/:id(\\d+)",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = await db.Post.findByPk(postId);
    await post.destroy();
    res.redirect("/");
  })
);

router.get(
  "/edit/:id(\\d+)",
  csrfProtection,
  requireAuth,
  asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = await db.Post.findByPk(postId);
    res.render("post-edit", {
      title: post.title,
      csrfToken: req.csrfToken(),
      post,
    });
  })
);

router.post(
  "/edit/:id(\\d+)",
  csrfProtection,
  requireAuth,
  asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = await db.Post.findByPk(postId);
    const { title, textField } = req.body;

    await post.update({
      title,
      textField,
    });

    res.redirect(`/posts/${postId}`);
  })
);

// router.ge;

module.exports = router;
