const express = require('express')
const router = express.Router()
const auth = require('./auth')
const characters = require('./characters')
const movies = require('./movies')
const swagger = require('./swagger')

router.use('/auth', auth)
router.use('/characters', characters)
router.use('/movies', movies)
router.use('/docs', swagger)

module.exports = router
