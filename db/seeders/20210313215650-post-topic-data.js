"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "PostTopics",
      [
        {
          postId: 1,
          topicId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 1,
          topicId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 2,
          topicId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 2,
          topicId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 3,
          topicId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 3,
          topicId: 18,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 3,
          topicId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 3,
          topicId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 4,
          topicId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 4,
          topicId: 12,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 4,
          topicId: 13,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 5,
          topicId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 5,
          topicId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 5,
          topicId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 6,
          topicId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 6,
          topicId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 6,
          topicId: 13,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 7,
          topicId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 7,
          topicId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 7,
          topicId: 13,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 8,
          topicId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 8,
          topicId: 12,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 8,
          topicId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("PostTopics", null, {});
  },
};
