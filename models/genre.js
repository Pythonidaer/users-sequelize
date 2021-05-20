'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
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
      return { ...this.get(), uuid: undefined, id: undefined, userOidc: undefined, createdAt: undefined, updatedAt: undefined }
    }
  };
  // I think for MVP we should have One:One
  // It seems easiest to have one genre record per user with all genres
  // Search should be able to parse with regex to find phrases
  // In the future, we could change this to a One:Many relationship
  // That might look like a user checking boxes in a word bank
  // I think Ryan mentioned this early on, it's a good idea
  Genre.init(
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
    tableName: 'genres',
    modelName: 'Genre',
  });
  return Genre;
};