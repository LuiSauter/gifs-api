const { Router } = require('express')
const router = Router()
const useExtractor = require('../middleware/userExtractor')
const { getAllFavs, createFav } = require('../controllers/favs.controller')
// const { isAuthenticated } = require('../helpers/auth')

router.route('/').get( useExtractor, getAllFavs)

router.route('/add').post(useExtractor, createFav)

module.exports = router