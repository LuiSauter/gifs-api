const { Router } = require('express')
const router = Router()
const passport = require('passport')

const { signup, signin, logout, deleteUser } = require('../controllers/register.controller')
const { isAuthenticated } = require('../helpers/auth')

router.route('/signup').post(signup)

router.route('/signin').post(passport.authenticate('local',{
  failureFlash: true
}), signin)

router.route('/logout').get(logout)

router.route('/delete').delete(isAuthenticated ,deleteUser)

module.exports = router
