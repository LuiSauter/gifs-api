const { Router } = require('express')
const router = Router()

const { createUser, getUser } = require('../controllers/register.controller')

router.route('/')
  .post(createUser)

router.route('/users')
  .get(getUser)

/**
 * trabajando en ello
 */
// router.route('/:id')
//   .put(updateUser)
//   .delete(deleteUser)

module.exports = router