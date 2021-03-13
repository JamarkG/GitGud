"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      textField: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
    },
    {}
  );
  Post.associate = function (models) {
    Post.belongsTo(models.User, { foreignKey: "userId" });
    Post.hasMany(models.Comment, {
      foreignKey: "postId",
      onDelete: "CASCADE",
      hooks: true,
    });

    const columnMapping = {
      through: "PostTopic",
      otherKey: "topicId",
      foreignKey: "postId",
    };

    Post.belongsToMany(models.Topic, columnMapping);
  };
  return Post;
};
