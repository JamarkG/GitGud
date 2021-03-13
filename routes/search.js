const express = require("express");
const db = require("../db/models");
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
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
    const topicID = topic.dataValues.id // 2
    // console.log(typeof topicID)
    let array = [];
    if (topic){
        //get all post id's where the topic id is equal to the topicId on postTopics if the query is a topic
        const postTopics = await db.PostTopic.findAll({ where: { topicId: topicID}})
         //[3, 5, 6]
        postTopics.forEach(postTopic => {
            array.push(postTopic.dataValues.postId)
        })
    }
    if (array.length) {
        const posts = await db.Post.findAll({
            where: {
                id: {
                    [Op.in]: array
                }
            }
        })
        res.render('search', { posts, csrfToken: req.csrfToken()})
    }
    // const queryPost = await db.Post.findAll({
    //     where: {
    //         textField: {
    //             [Op.substring]: req.query.search
    //         }
    //     }
    // })
    // else {
    //     const noReturnMessage = 'Your search did not return any results';
    // }


    // console.log(topic);
    // const topicName = topic.dataValues.name;
    // const topicID = topic.id
    // const postsTopics = await db.PostTopic.findAll({ where: topicID =  });
    // const topics = postsTopic.topicId
    // const posts = await db.Post.findAll({ include: topic});
}));








module.exports = router;
