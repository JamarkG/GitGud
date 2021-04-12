"use strict";
module.exports = (sequelize, DataTypes) => {
  const topicFollow = sequelize.define(
    "topicFollow",
    {
      userId: {
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
  topicFollow.associate = function (models) {
    // associations can be defined here
  };
  return topicFollow;
};
