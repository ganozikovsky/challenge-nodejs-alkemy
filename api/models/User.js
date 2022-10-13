const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')
const sequelize = require('../config/db')

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
    username: {
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
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'user'
  }
)

User.beforeCreate((user) => {
  const salt = bcrypt.genSaltSync()
  user.salt = salt
  return user.hash(user.password, salt).then((hash) => {
    user.password = hash
  })
})

User.prototype.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

module.exports = User
