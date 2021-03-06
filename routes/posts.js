const express = require("express");
const db = require("../db/models");
const sequelize = require("sequelize");
const Op = sequelize.Op;
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
      include: [
        {
          model: db.Topic,
        },
        {
          model: db.Comment,
          include: { model: db.User },
        },
      ],
    });
    const postTopicsArr = post.dataValues.Topics;
    // postTopicsArr.forEach(topic => {
    //   console.log(topic.dataValues.name) // grabs the name of the topic
    //   console.log(topic.dataValues.id) // grabs the id of the topic
    // })
    console.log(post);
    if (post) {
      res.render("post-detail", {
        title: post.title,
        post,
        postTopicsArr,
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

router.get(
  "/edit/:id(\\d+)",
  csrfProtection,
  requireAuth,
  asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = await db.Post.findByPk(postId);
    const topics = await db.Topic.findAll();
    res.render("post-edit", {
      title: post.title,
      csrfToken: req.csrfToken(),
      topics,
      post,
    });
  })
);

router.post(
  "/edit/:id(\\d+)",
  csrfProtection,
  postValidators,
  requireAuth,
  asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = await db.Post.findByPk(postId);
    const { title, textField } = req.body;
    console.log(req.body);
    delete req.body._csrf;
    delete req.body.title;
    delete req.body.textField;
    // console.log(req.body);

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      const topicsId = Object.values(req.body);
      const topics = await db.Topic.findAll({
        where: {
          id: {
            [Op.in]: topicsId,
          },
        },
      });

      await post.setTopics(topics);
      await post.update({
        title,
        textField,
      });
      res.redirect(`/posts/${post.id}`);
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      console.log(errors);
      const topics = await db.Topic.findAll();
      res.render("post-edit", {
        csrfToken: req.csrfToken(),
        errors,
        post,
        topics,
      });
    }
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

router.post(
  "/create",
  csrfProtection,
  postValidators,
  asyncHandler(async (req, res) => {
    const { title, textField } = req.body;
    const { userId } = req.session.auth;
    const post = db.Post.build({ title, textField, userId });
    console.log(req.body);

    delete req.body._csrf;
    delete req.body.title;
    delete req.body.textField;
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await post.save();
      for (const [key, value] of Object.entries(req.body)) {
        const topicId = parseInt(value, 10);
        console.log(topicId);
        const topic = await db.Topic.findByPk(topicId);
        console.log(topic);
        await post.addTopic(topic);
      }
      res.redirect(`/posts/${post.id}`);
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render("posts-create", {
        csrfToken: req.csrfToken(),
        errors,
        title,
        textField,
        topics: req.body,
      });
    }
  })
);

module.exports = router;
