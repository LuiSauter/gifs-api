const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const UserModel = require('../models/User')
const loginCtrl = {}

loginCtrl.login = async (req, res) => {
  const { body } = req
  const { username, password } = body
  const user = await UserModel.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    res.status(401).json({ error: 'Invalid user or password'})
  }

  const userForToken = { id: user._id, username: user.username }

  const token = jwt.sign(
    userForToken,
    process.env.SECRET, {
      expiresIn: 60 * 60 * 24 * 7 // 7 days
    }
  )
  res.send({
    username: user.username,
    token
  })
}

module.exports = loginCtrl