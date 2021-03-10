"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Comments",
      [
        {
          body: "This is the first comment",
          userId: 1,
          postId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body: "This is the second comment",
          userId: 2,
          postId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Comments", null, {});
  },
};
