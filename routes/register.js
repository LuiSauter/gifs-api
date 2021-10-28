const { Router } = require('express')
const router = Router()

const { createUser } = require('../controllers/user.controller')

router.route('/')
  .post(createUser)
/**
 * trabajando en ello
 */
// router.route('/:id')
//   .put(updateUser)
//   .delete(deleteUser)