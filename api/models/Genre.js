const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/db')

class Genre extends Model {}

Genre.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    picture: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: 'genre'
  }
)

module.exports = Genre
