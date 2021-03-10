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

router.get(
  "/create",
  csrfProtection,
  requireAuth,
  asyncHandler(async (req, res) => {
    const topics = await db.Topic.findAll();
    res.render("posts-create", {
      title: "Create Post",
      topics,
      csrfToken: req.csrfToken(),
    });
  })
);

const postValidators = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Post must have a title")
    .isLength({ max: 100 })
    .withMessage("Title must be under 100 characters or less."),
  check("textField")
    .exists({ checkFalsy: true })
    .withMessage("Post body must have text."),
];

router.post(
  "/create",
  csrfProtection,
  postValidators,
  asyncHandler(async (req, res) => {
    const { title, textField } = req.body;
    const { userId } = req.session.auth;
    const post = db.Post.build({ title, textField, userId });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await post.save();
      res.redirect(`/posts/${userId}`);
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render("posts-create", {
        title: "Create Post",
        csrfToken: req.csrfToken(),
        errors,
        post,
      });
    }
  })
);

module.exports = router;
