const express = require('express')
const router = express.Router()
const { validateAuth } = require('../middlewares/auth')
const { getAll, getSingle, create, edit, remove } = require('../controllers/characters')

router.get('/', validateAuth, getAll)
router.post('/', validateAuth, create)
router.get('/:id', validateAuth, getSingle)
router.post('/:id', validateAuth, edit)
router.post('/:id', validateAuth, remove)

module.exports = router
