const JWT = require('jsonwebtoken')
const { SECRET_KEY } = require('../config.js')

const authRequired = (req, res, next) => {
  const { flowToken } = req.cookies
  if (!flowToken) {
    return res.status(401).json({message: "no token, aurhorizacion denied"})
  } else {
    JWT.verify(flowToken,SECRET_KEY, (error, user) => {
      if (error) {
        return res.status(403).json({message: "invalid token"})
      } else {
        req.user = user
        next()
      }
    })
  }
}

module.exports = authRequired