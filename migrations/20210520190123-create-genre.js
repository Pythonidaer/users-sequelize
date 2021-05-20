'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('genres', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userOidc: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('genres');
  }
};