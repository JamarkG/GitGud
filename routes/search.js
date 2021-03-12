const express = require("express");
const db = require("../db/models");
const router = express.Router();
// const { sequelize } = require('../app.js');
// const { Op } = require("sequelize");
const { csrfProtection, asyncHandler } = require("./utils");
// const { check, validationResult } = require("express-validator");
// const { loginUser, logoutUser, requireAuth } = require("../auth");

router.get('/search', csrfProtection, asyncHandler(async (req, res) => {
    // console.log(req.query.search);
    const topic = await db.Topic.findOne({
        where: {
            name: `${req.query.search}`
        }
    })
    const topicID = topic.dataValues.id
    // console.log(typeof topicID)
    if (topic){
        const postIDs = await db.PostTopic.findAll({ where:
            { topicId: topicID
        }})
        console.log(postIDs.json())
    }

    // console.log(topic);
    // const topicName = topic.dataValues.name;
    // const topicID = topic.id
    // const postsTopics = await db.PostTopic.findAll({ where: topicID =  });
    // const topics = postsTopic.topicId
    // const posts = await db.Post.findAll({ include: topic});
    res.render('search', { topic, csrfToken: req.csrfToken() });
}));








module.exports = router;
