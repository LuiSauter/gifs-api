const { Router } = require('express')
const router = Router()

const { login } = require('../controllers/login.controller')

router.route('/')
  .post(login)

module.exports = router
