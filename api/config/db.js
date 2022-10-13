const Sequelize = require('sequelize')

const db = new Sequelize('alkemynodejs', 'postgres', 'gonzalo', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
})

module.exports = db
