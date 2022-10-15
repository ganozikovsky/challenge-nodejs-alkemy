const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/db')
const bcrypt = require('bcrypt')

class User extends Model {
  hash (password, salt) {
    return bcrypt.hash(password, salt)
  }

  validatePassword (password) {
    return this.hash(password, this.salt).then(
      (newHash) => newHash === this.password
    )
  }
}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Must be a valid email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: 'user'
  }
)

User.beforeCreate(async (user) => {
  const salt = bcrypt.genSaltSync()
  user.salt = salt
  return user.hash(user.password, salt).then((hash) => {
    user.password = hash
  })
})

module.exports = User
