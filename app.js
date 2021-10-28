const express = require('express')
const cors = require('cors')
const logger = require('./loggerMiddleware')

const app = express()

const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')

/**
 * middleware
 */
app.use(cors())
app.use(express.json())
app.use(logger)
// for template
// app.use(express.static('./template/example'))

/**
 * routes
 */
app.get('/', (req, res) => {
  res.send('<div><h1>GIF API</h1><a href="https://my-gifs.vercel.app/">See app gifs</a></div>')
})
app.use('/api/register', require('./routes/register'))
app.use('/api/login', require('./routes/login'))
app.use('/api/favs', require('./routes/favs'))
/**
 * routes test
 */
if (process.env.NODE_ENV === 'test') {
  app.use('api/testing', require(''))
}

/**
 * error handling
 */
app.use(notFound)
app.use(handleErrors)

module.exports = app