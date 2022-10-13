const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/db')

class Character extends Model {}

Character.init(
  {
    picture: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER
    },
    weigth: {
      type: DataTypes.FLOAT
    },
    history: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: 'character'
  }
)

module.exports = Character
