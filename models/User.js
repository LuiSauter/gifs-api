// const uniqueValidator = require('mongoose-unique-validator')
const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true })
// bcrypt || Encryption
UserSchema.methods.encryptPassword = async password => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}
// Validation || Compare
UserSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password)
} // boolean

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

// UserSchema.plugin(uniqueValidator)
const User = model('User', UserSchema)

module.exports = User