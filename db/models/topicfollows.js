"use strict";
module.exports = (sequelize, DataTypes) => {
  const topicFollows = sequelize.define(
    "topicFollows",
    {
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      topicId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {}
  );
  topicFollows.associate = function (models) {
    // associations can be defined here
  };
  return topicFollows;
};
