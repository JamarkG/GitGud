'use strict';
module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define('Topic', {
    name: {
      allowNull: false,
      type: DataTypes.STRING(50),
      unique: true
    }
  }, {});
  Topic.associate = function(models) {
    // associations can be defined here
    // TODO:
      // Associate with TopicFollows
      // Associate with postsTopics

  };
  return Topic;
};
