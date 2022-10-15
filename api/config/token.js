const jwt = require('jsonwebtoken')

const generateToken = (payload) => {
  const token = jwt.sign({ user: payload }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES
  })
  return token
}

const validateToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = { generateToken, validateToken }
