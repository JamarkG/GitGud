'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    textField: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  }, {});
  Post.associate = function(models) {
    Post.belongsTo(models.User, {foreignKey: 'userId'});
  };
  return Post;
};
