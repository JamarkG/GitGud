"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("topicFollows", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      topicId: {
        type: Sequelize.INTEGER,
      },
      postId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("topicFollows");
  },
};

// id: {
//   allowNull: false,
//   autoIncrement: true,
//   primaryKey: true,
//   type: Sequelize.INTEGER,
// },
// postId: {
//   allowNull: false,
//   type: Sequelize.INTEGER,
//   references: { model: "Posts" },
//   onDelete: "CASCADE",
// },
// topicId: {
//   allowNull: false,
//   type: Sequelize.INTEGER,
//   references: { model: "Topics" },
//   onDelete: "CASCADE",
// },
// createdAt: {
//   allowNull: false,
//   type: Sequelize.DATE,
// },
// updatedAt: {
//   allowNull: false,
//   type: Sequelize.DATE,
// },
