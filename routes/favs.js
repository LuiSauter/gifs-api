const { Router } = require('express')
const router = Router()
const useExtractor = require('../middleware/userExtractor')

const { postFavs, getFavs, deleteFavs } = require('../controllers/favs.controller')

router.route('/')
  .get(useExtractor, getFavs )
  .post(useExtractor, postFavs)

router.route('/:id')
  .delete(useExtractor, deleteFavs)

module.exports = router