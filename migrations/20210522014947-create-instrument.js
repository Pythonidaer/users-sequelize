'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('instruments', {
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
        type: DataTypes.STRING
      },
      userOidc: {
        type: DataTypes.STRING
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('instruments');
  }
};