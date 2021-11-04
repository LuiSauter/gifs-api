const express = require('express')
const cors = require('cors')
const logger = require('./loggerMiddleware')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
// Initializations
const app = express()

const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')
/**
 * Middleware
 */
app.use(cors({
  origin: 'https://my-gifs.vercel.app',
  credentials: true
}))
app.use(express.json())
app.use(logger)
app.use(session({
  secret: 'secretcode',
  resave: true,
  saveUninitialized: true
}))

app.use(cookieParser('secretcode'))

app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')
app.use(flash())

/**
 * Global Variables
 */
app.use((req, res, next) => {
  res.locals.error = req.flash('error')
  res.locals.user = req.user || null
  next()
})
/**
 * Routes
 */
app.get('/', (req, res) => {// no template
  res.send('<div><h1 style="color: #123; font-family: sans-serif">GIF API</h1></div>')
})
app.use('/api/users', require('./routes/user.routes'))
app.use('/api/favs', require('./routes/favs.routes'))
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