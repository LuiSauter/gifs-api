const User = require('../models/User')
const FavModel = require('../models/Fav')
const usersCtrl = {}

usersCtrl.signup = async (req, res) => {
  const { name, email, password, confirm_password } = req.body
  const newUser = {
    email,
  }
  console.log('************bodyRegister************')
  console.log(req.body)
  console.log('************bodyRegister************')
  if (password !== confirm_password) {
    newUser.password = password
    newUser.confirm_password = confirm_password
    newUser.name = name
    newUser.message = 'Passwords do not match'
    return res.json(newUser)
  }
  if (password.length < 8) {
    newUser.password = password
    newUser.confirm_password = confirm_password
    newUser.name = name
    newUser.message = 'Passwords must be at least 4 characters'
    return res.json(newUser)
  }

  const emailUser = await User.findOne({ email: email })

  if (emailUser) {
    newUser.password = password
    newUser.confirm_password = confirm_password
    newUser.name = name
    newUser.message = 'The email is already in use.'
    return res.json(newUser)
  }
  const newObjectUser = new User({ name, email, password })
  newObjectUser.password = await newObjectUser.encryptPassword(password)
  await newObjectUser.save()

  console.log('**********SIGNUP**********')
  console.log(newObjectUser)
  console.log('**********SIGNUP**********')
  newUser.message = 'Signup Successfuly!'
  res.status(201).json(newUser)
}

usersCtrl.signin = async (req, res) => {
  console.log('************DEBUG-SIGNIN************')
  console.log({ message: true })
  console.log('************DEBUG-SIGNIN************')
  res.json({ message: true})
}

usersCtrl.logout = async (req, res) => {
  req.logout()
  res.json({ message: 'You are logged out now.' })
}

usersCtrl.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.user.id)
  await FavModel.deleteMany({ user: req.user.id })
  res.status(204).end()
}

module.exports = usersCtrl