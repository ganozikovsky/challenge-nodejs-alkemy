const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/db')

class Movie extends Model {}

Movie.init(
  {
    picture: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    calification: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5
      }
    }
  },
  {
    sequelize,
    modelName: 'movie'
  }
)

module.exports = Movie
