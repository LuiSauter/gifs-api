const UserModel = require('../models/User')
const bcrypt = require('bcrypt')
const usersCtrl = {}

usersCtrl.createUser = async (req, res) => {
  try {
    const { body } = req
    const { username, password } = body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    if (!username) {
      return res.status(400).json({ error: 'required "username" field is missing' })
    }
    // register user
    const newUser = new UserModel(username, passwordHash)
    const saveUser = await newUser.save()
    res.status(201).json(saveUser)
  } catch (error) {
    res.status(400).json(error)
  }
}
/**
 * trabajando en ello
 */
// usersCtrl.updateUser = async (req, res) => {}
// usersCtrl.deleteUser = async (req, res) => {}

module.exports = usersCtrl