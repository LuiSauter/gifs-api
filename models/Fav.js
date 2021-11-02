const { Schema, model } = require('mongoose')

const favSchema = new Schema({
  fav: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  }
}, { timestamps: true})

favSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Fav = model('Fav', favSchema)

module.exports = Fav