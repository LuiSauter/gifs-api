const jwt = require('jsonwebtoken')
// middleware que hace la extraccion del usuario y el token
module.exports = (request, response, next) => {
  const authorization = request.get('authorization')// header
  let token = ''
  console.log(authorization, 'AUTORIZACION')

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)
  console.log(decodedToken, 'DECODEDTOKEN')

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const { id: userId } = decodedToken
  request.userId = userId
  next()
}
