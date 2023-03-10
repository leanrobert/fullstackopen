const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  res.json(blogs)
})

blogRouter.post('/', async (req, res) => {
  if(!req.body.title || !req.body.author) return res.status(400).json({ error: "Missing information, pass title, author and url"})

  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if(!decodedToken.id) return res.status(401).json({ error: 'Token invalid' })

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes || 0,
    user: user.id
  })

  const newBlog = await blog.save()
  user.blogs = user.blogs.concat(newBlog._id)
  await user.save()
  res.status(201).json(newBlog)
})

blogRouter.put('/:id', async (req, res) => {
  const body = req.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findOneAndUpdate(req.params.id, blog, {new:true})
  res.status(200).json(updatedBlog)
})

blogRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if(!decodedToken.id) return res.status(401).json({ error: 'Token invalid' })

  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(id).populate('user', { id: 1 })

  if (!user) return res.status(400).json({ error: 'User does not exist' })

  if(user._id.toString() !== blog.user.id.toString()) {
    return res.status(401).json({ error: 'Not authorized to do that', user: user._id, blogUser: blog.user.id })
  }

  await Blog.findByIdAndRemove(id)

  res.status(204).end()
})

module.exports = blogRouter