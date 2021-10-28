const jwt = require('jsonwebtoken')
// middleware que hace la extraccion del usuario y token
module.exports = (req, res, next) => {
  const authorization = req.get('authorization')// header
  let token = ''
  console.log(authorization, 'AUTORIZACION')
  if (authorization && authorization.toLoweCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }
  // firma
  const decodedToken = jwt.verify(token, process.env.SECRET)
  console.log(decodedToken, 'DECODEDTOKEN')
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const { id: userId } = decodedToken
  req.userId = userId
  next()
}
