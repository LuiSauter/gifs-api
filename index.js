require('dotenv').config()
const app = require('./app')
require('./database')

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
  console.log('Server running on port ' + PORT)
})

module.exports = { app, server}