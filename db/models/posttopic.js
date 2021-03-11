"use strict";
module.exports = (sequelize, DataTypes) => {
  const PostTopic = sequelize.define(
    "PostTopic",
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
  PostTopic.associate = function (models) {};
  return PostTopic;
};
