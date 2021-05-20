'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('users', {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true, // if we end up needing this, oidc can't be PK
      //   type: DataTypes.INTEGER
      // },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      nickName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "New User"
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "New"
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "User"
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      intentionStatus: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bandName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      oidc: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.STRING,
        required: true,
        primaryKey: true,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('users');
  }
};