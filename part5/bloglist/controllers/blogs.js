const blogRouter = require('express').Router()
const Blog = require('../models/blog')

const { userExtractor } = require('../utils/middleware')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

blogRouter.post('/', userExtractor, async (req, res) => {
  const { title, author, url, likes } = req.body

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes ? likes : 0,
  })

  const user = req.user

  if(!user) return res.status(401).json({ error: 'operation not permited' })

  blog.user = user._id

  const newBlog = await blog.save()
  user.blogs = user.blogs.concat(newBlog._id)
  await user.save()

  res.status(201).json(newBlog)
})

blogRouter.put('/:id', async (req, res) => {
  const { title, author, url, likes, user } = req.body
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { title, author, url, likes }, {new:true})
  res.status(200).json(updatedBlog)
})

blogRouter.delete('/:id', userExtractor, async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  const user = req.user

  if (!user || blog.user.toString() !== user.id.toString()) {
    return res.status(401).json({ error: 'operation not permited' })
  }

  user.blogs = user.blogs.filter(b => b.toString() !== blog.id.toString())

  await user.save()
  await blog.remove()

  res.status(204).end()
})

module.exports = blogRouter