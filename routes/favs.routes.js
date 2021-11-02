const { Router } = require('express')
const router = Router()
// const useExtractor = require('../middleware/userExtractor')
const { getAllFavs, createFav } = require('../controllers/favs.controller')
const { isAuthenticated } = require('../helpers/auth')

router.route('/').get(isAuthenticated, getAllFavs)

router.route('/add').post(isAuthenticated, createFav)

module.exports = router