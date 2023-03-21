

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/database.config.js");

class Post extends Model {};

Post.init({
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false 
      },
      title: { 
        type: DataTypes.STRING, 
        unique: false, 
        allowNull: false 
      },
      content: { 
        type: DataTypes.TEXT('long'), 
        allowNull: false },
      author: { 
        type: DataTypes.INTEGER, allowNull: false,
      },
}, {
    sequelize,
    tableName: 'posts',
    modelName: 'Post'
});

module.exports = Post;