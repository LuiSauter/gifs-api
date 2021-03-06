// const UserModel = require('../models/User')
const FavModel = require('../models/Fav')
const favsCtrl = {}

favsCtrl.getAllFavs = async (req, res) => {
  const favs = await FavModel.find({ user: req.user }).sort({ createdAt: 'desc' })
  console.log('************DEBUG-GETALLFAVS************')
  console.log(favs)
  console.log('************DEBUG-GETALLFAVS************')
  res.json(favs)
}

favsCtrl.createFav = async (req, res) => {
  const { fav, title } = req.body
  if (!fav) {
    return res.status(404).json({ message: false })
  }

  const favs = await FavModel.findOne({ user: req.user, fav: fav })

  if (favs !== null) {
    await FavModel.findByIdAndDelete(favs._id)
    return res.json({ message: true })
  }

  const newFav = new FavModel({ fav, title })
  newFav.user = req.user
  const favSaved = await newFav.save()
  console.log('************USER************')
  console.log(favSaved)
  console.log('************USER************')

  const resFav = {
    fav: favSaved.fav,
    id: favSaved._id,
    title: favSaved.title,
    message: 'Successfully Added'
  }
  res.status(201).json(resFav)
}

module.exports = favsCtrl
