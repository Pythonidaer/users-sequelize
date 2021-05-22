'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Instrument extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      // Sequelize automatically looks for the name of model followed by the PR
      // name of model: User
      // primary key: oidc
      this.belongsTo(User, { foreignKey: 'userOidc', as: 'user' })
    }

    toJSON() {
      return { ...this.get(), uuid: undefined, id: undefined, userOidc: undefined }
    }
  };
  Instrument.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userOidc: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }, {
    sequelize,
    tableName: 'instruments',
    modelName: 'Instrument',
  });
  return Instrument;
};