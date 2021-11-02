const helpers = {}

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.json({ auth: false })
}

module.exports = helpers
