const User = require("../models/user")
const jwt = require('jsonwebtoken')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if(authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '')
  }

  next()
}

const userExtractor = async (req, res, next) => {
  console.log("token", req.token);
  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if(!decodedToken.id) return res.status(401).json({ error: 'Token invalid' })

  req.user = await User.findById(decodedToken.id)
  next()
}

module.exports = {
  tokenExtractor,
  userExtractor
}