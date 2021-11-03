const User = require('../models/User')
const FavModel = require('../models/Fav')
// const passport = require('passport')
const jwt = require('jsonwebtoken')
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
    newUser.message = 'Passwords do not match'
    return res.json(newUser)
  }
  if (password.length < 8) {
    newUser.message = 'Passwords must be at least 4 characters'
    return res.json(newUser)
  }

  const emailUser = await User.findOne({ email: email })

  if (emailUser) {
    newUser.message = 'The email is already in use.'
    return res.json(newUser)
  }
  const newObjectUser = new User({ name, email, password })
  newObjectUser.password = await newObjectUser.encryptPassword(password)
  await newObjectUser.save()

  const token = jwt.sign({ _id: newObjectUser._id }, process.env.SECRET, {
    expiresIn: 86400 // 24 hours
  })

  console.log('**********SIGNUP**********')
  console.log(newObjectUser)
  console.log('**********SIGNUP**********')
  newUser.message = 'Signup Successfuly!'
  newUser.token = token
  res.status(201).json(newUser)
}

usersCtrl.signin = async (req, res) => {
  /** jwt */
  const userFound = await User.findOne({ email: req.body.email})
  if (!userFound) return res.json({ message: 'User not found' })
  console.log(userFound)

  const comparePassword = await userFound.matchPassword(req.body.password)
  if (!comparePassword) return res.status(401).json({ token: null, message: 'Invalid password'})
  console.log('*********comparePassword***********')
  console.log(comparePassword)
  console.log('*********comparePassword***********')

  const token = jwt.sign({ _id: userFound._id }, process.env.SECRET, {
    expiresIn: 86400 // 24 hours
  })
  res.json({ message: 'Successfuly Authenticated', token: token})
  /**
   * PASSPORT JS
   */
  // passport.authenticate('local',(err, user) => {
  //   if (err) throw err
  //   if (!user) res.json({ message: 'No user exists.' })
  //   else {
  //     req.login(user, err => {
  //       const resUser = {
  //         name: user.name,
  //         email: user.email,
  //         id: user.id,
  //         message: 'Successfuly Authenticated',
  //         token: token
  //       }
  //       if (err) throw err
  //       res.json(resUser)
  //       console.log(req.user)
  //     })
  //   }
  // }) (req, res, next)
}

// usersCtrl.logout = async (req, res) => {
//   req.logout()
//   res.json({ message: 'You are logged out now.' })
// }

usersCtrl.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.user)
  await FavModel.deleteMany({ user: req.user })
  res.status(204).end()
}

module.exports = usersCtrl