const JWT = require('jsonwebtoken')
const { SECRET_KEY } = require("../config.js")

module.exports = function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    JWT.sign(payload, SECRET_KEY, { expiresIn: "365d" }, (error, token) => {
      if (error) reject(error);
      resolve(token)
    })
  })
}