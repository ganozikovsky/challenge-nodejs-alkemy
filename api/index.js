const express = require('express')
require('dotenv').config()
const routes = require('./routes')
const cors = require('cors')
const app = express()
const db = require('./config/db')
require('./models')

// middlewares
app.use(cors())
app.use(express.json())
app.use('/api', routes)

db.sync({ force: false }).then(() => {
  console.log('db connected')
  app.listen(process.env.PORT || 8080, () => {
    console.log('Server listening at port 8080')
  })
})
