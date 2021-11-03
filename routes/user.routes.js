const { Router } = require('express')
const router = Router()

const { signup, signin, logout, deleteUser } = require('../controllers/register.controller')
// const { isAuthenticated } = require('../helpers/auth')
const useExtractor = require('../middleware/userExtractor')

router.route('/signup').post(signup)

router.route('/signin').post(signin)

router.route('/logout').get(logout)

router.route('/delete').delete(useExtractor ,deleteUser)

module.exports = router
