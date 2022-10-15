const { User } = require('../models')
const { generateToken } = require('../config/token')
const MailService = require('../config/email')

async function login (req, res) {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'username and password are mandatory' })
  }
  try {
    const user = await User.findOne({ where: { email } })
    if (!user) return res.status(404).json({ error: 'email has not be found' })
    const isValid = await user.validatePassword(password)
    if (!isValid) { return res.status(401).send({ message: 'error - incorrect password' }) }
    const payload = {
      id: user.id,
      email: user.email
    }
    const token = generateToken(payload)
    return res.status(202).json({
      message: 'successfully logged in',
      user: payload,
      token
    })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

async function register (req, res) {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'email and password are mandatory' })
  try {
    const user = await User.create({ email, password })
    const payload = {
      id: user.id,
      email: user.email
    }

    const mail = new MailService(
      user.email,
      'Welcome',
      `Welcome ${user.email} to Alkemy API challenge`,
      `<h2>Welcome ${user.email} to Alkemy API challenge</h2>`
    )
    mail.sendMail().catch((error) => console.log(error))

    const token = generateToken(payload)
    return res.status(201).json({
      message: 'successfully registered',
      user: payload,
      token
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = { login, register }
