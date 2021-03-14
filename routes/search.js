const express = require("express");
const db = require("../db/models");
const router = express.Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { asyncHandler } = require("./utils");



router.get('/search/?', asyncHandler(async (req, res) => {
    if (req.query.topic) {

        const topicId = req.query.topic // 2
        let array = [];
            //get all post id's where the topic id is equal to the topicId on postTopics if the query is a topic
        const postTopics = await db.PostTopic.findAll({ where: { topicId }})
        if (postTopics[0]) {
            postTopics.forEach(postTopic => {
                array.push(postTopic.dataValues.postId)
            })
            const posts = await db.Post.findAll({
                where: {
                    id: {
                        [Op.in]: array
                    }
                }
            })
            res.render('search', { posts })
        } else {
            const noReturnMessage = 'Your search did not return any results!';
            res.render('search', { noReturnMessage })
        }
    }
    else if (req.query.search) {
        const searchInsensitive = req.query.search.toLowerCase()
        const topic = await db.Topic.findOne({
					where: {
						name: {
							[Op.or]: {
								[Op.iLike]: `%${req.query.search}%`,
								[Op.substring]: req.query.search,
								[Op.substring]: searchInsensitive,
							},
						},
					},
				});
        if (!topic){
            const searchPosts = await db.Post.findAll({
                where: {
                    [Op.or]: {
                        title: {
                            [Op.or]:[
                                {[Op.substring]: req.query.search},
                                {[Op.substring]: searchInsensitive},
                                {[Op.startsWith]: req.query.search},
                                {[Op.startsWith]: searchInsensitive}
                            ]
                        },
                        textField: {
                            [Op.or]:[
                                {[Op.substring]: req.query.search},
                                {[Op.substring]: searchInsensitive},
                                {[Op.startsWith]: req.query.search},
                                {[Op.startsWith]: searchInsensitive}
                            ]
                        }
                    }
                }
            })
            console.log(searchPosts);
            if (searchPosts[0]){
                return res.render('search', { searchPosts });
            }
            else {
                const noReturnMessage = "Your search did not return any results!";
                return res.render("search", { noReturnMessage });
            }
        }
        const topicID = topic.dataValues.id
        let array = [];
            //get all post id's where the topic id is equal to the topicId on postTopics if the query is a topic
        const postTopics = await db.PostTopic.findAll({ where: { topicId: topicID}})
        if (postTopics[0]) {
             postTopics.forEach(postTopic => {
                array.push(postTopic.dataValues.postId)
            })
            const posts = await db.Post.findAll({
                where: {
                    id: {
                        [Op.in]: array
                    }
                }
            })
            res.render('search', { posts })
        } else {
            const noReturnMessage = 'Your search did not return any results!';
            res.render('search', { noReturnMessage })
        }
    } else {
      const noReturnMessage = "Your search did not return any results!";
      res.render("search", { noReturnMessage });
    }
  })
);

module.exports = router;
