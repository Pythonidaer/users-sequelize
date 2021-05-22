'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Genre, Instrument }) {
      // define association here
      this.hasOne(Genre, { foreignKey: 'userOidc', as: 'genres' })
      this.hasOne(Instrument, { foreignKey: 'userOidc', as: 'instruments' })
    }

    toJSON() {
      return { ...this.get(), uuid: undefined }
    }
  };
  User.init({
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
  }, {
    sequelize,
    // freezeTableName: true,
    // underscored: true,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};