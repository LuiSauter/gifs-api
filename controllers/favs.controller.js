const UserModel = require('../models/User')
const favsCtrl = {}
const FavModel = require('../models/Fav')

favsCtrl.getFavs = async (req, res) => {
  const favs = await FavModel.find({}).populate('user', {
    username: 1,
    _id: 0
  })
  res.json(favs)
}

favsCtrl.postFavs = async (req, res, next) => {
  const { fav } = req.body
  const { userId } = req
  const user = await UserModel.findById(userId)
  // const favorites = await FavModel.find({})
  // const alreadyExist = favorites.some(favM => favM === fav)
  if (!fav) {
    return res.status(404).json({ error: 'required "fav" field is missing' })
  }
  const newFav =new FavModel({
    fav,
    user: user._id
  })
  try {
    const savedFav = await newFav.save()
    console.log(savedFav._id, 'SAVEDFAV ID')
    user.favs = user.favs.concat(savedFav._id)
    await user.save()
    res.json(savedFav)
  } catch (error) {
    next(error)
  }
}

favsCtrl.deleteFavs = async (req, res, next) => {
  try {
    const { id } = req.params
    console.log(req.params, 'help Debug')
    await FavModel.findByIdAndDelete(id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}

module.exports = favsCtrl
