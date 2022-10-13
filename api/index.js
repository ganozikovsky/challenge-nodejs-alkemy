const express = require('express')
require('./models')

const cors = require('cors')

const app = express()
app.use(cors())

const db = require('./config/db')

app.use(express.json())

db.sync({ force: false }).then(() => {
  console.log('db connected')
  app.listen(process.env.PORT || 8080, () => {
    console.log('Server listening at port 8080')
  })
})
