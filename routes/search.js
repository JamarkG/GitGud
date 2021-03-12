const express = require("express");
const db = require("../db/models");
const router = express.Router();
const { csrfProtection, asyncHandler } = require("./utils");
const { check, validationResult } = require("express-validator");
const { loginUser, logoutUser, requireAuth } = require("../auth");

router.get('/search', asyncHandler(async (req, res) => {
    // console.log(req.body.query);
    const postsTopics = await db.PostTopic.findAll({});
    const topics = postsTopic.topicId
    const posts = await db.Post.findAll();
    res.render('search', posts)
}))








module.exports = router;
