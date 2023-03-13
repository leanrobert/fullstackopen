const testingRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

testingRouter.post('/reset', async (req, res) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const user = new User({
    username: "lrobert",
    name: "Leandro Robert",
    password: "lean1234"
  })

  await user.save()

  res.status(204).end()
})

module.exports = testingRouter