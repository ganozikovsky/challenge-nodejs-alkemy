const express = require('express')
const router = express.Router()
const swaggerUI = require('swagger-ui-express')
const yaml = require('yamljs')
const path = require('path')

const swaggerDocument = yaml.load(
  path.join(process.cwd(), 'api', 'openapi.yaml')
)

router.use('/', swaggerUI.serve)
router.get('/', swaggerUI.setup(swaggerDocument))

module.exports = router
