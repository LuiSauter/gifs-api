const jwt = require('jsonwebtoken')
// middleware que hace la extraccion del usuario y el token
module.exports = (request, response, next) => {
  // const authorization = request.get('authorization')// header
  // let token = ''
  const authorization = request.headers.authorization
  if (!authorization) return response.status(401).send('Unthorized Request')

  const token = authorization.split(' ')[1]

  console.log('**********TOKEN**********')
  console.log(token)
  console.log('**********TOKEN**********')

  if (token === 'null') return response.status(401).send('Unthorized Request')

  const payload = jwt.verify(token, process.env.SECRET)
  console.log('**********TOKEN**********')
  console.log(payload)
  console.log('**********TOKEN**********')
  request.user = payload._id
  next()
}
