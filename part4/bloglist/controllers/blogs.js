const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogRouter.post('/', async (req, res) => {
  if(!req.body.title || !req.body.author) return res.status(400).json({ error: "Missing information, pass title, author and url"})

  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes || 0
  })

  await blog.save()
  res.status(201).json(blog)
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
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})



module.exports = blogRouter