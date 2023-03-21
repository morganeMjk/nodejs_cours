'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('posts', {
      id: { 
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false 
      },
      title: { 
        type: Sequelize.STRING, 
        unique: false, 
        allowNull: false 
      },
      content: { 
        type: Sequelize.TEXT('long'), 
        allowNull: false },
      author: { 
        type: Sequelize.INTEGER, allowNull: false,
        references: {
        model: 'users',
        key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      createdAt: { 
        type: Sequelize.DATE 
      },
      updatedAt: { 
        type: Sequelize.DATE 
      }
    })},


  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('posts');
  }
};