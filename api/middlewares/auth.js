const { validateToken } = require('../config/token')

async function validateAuth (req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ error: 'access unauthorized' })
  }
  const bearerToken = authHeader.substring(7)
  try {
    const { user } = validateToken(bearerToken)
    req.user = user
    return next()
  } catch (error) {
    return res.status(403).json({ error: 'access forbidden' })
  }
}

module.exports = { validateAuth }
