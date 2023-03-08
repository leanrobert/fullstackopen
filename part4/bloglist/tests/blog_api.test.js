const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    "title": "Blog de test 1",
    "author": "Autor test 1",
    "url": "blog.com/autortest1",
    "likes": 2
  },
  {
    "title": "Blog test 2",
    "author": "Autor2",
    "url": "blog.com/autor2test",
    "likes": 4
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObj = new Blog(initialBlogs[0])
  await blogObj.save()
  blogObj = new Blog(initialBlogs[1])
  await blogObj.save()
})

test('should return blog list as JSON', async () => {
  await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
}, 100000)

test('identifier field should be named id, not _id', async () => {
  const blogs = await api.get('/api/blogs')
  expect(blogs.body[0].id).toBeDefined()
}, 100000)

test('successfully creates a blog post', async () => {
  const newBlog = {
    title: "Agregado",
    author: "Autor Agregado",
    url: "blog.com/agregado",
    likes: 0
  }

  await api.post('/api/blogs')
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const content = response.body.map(r => r.url)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(content).toContain("blog.com/agregado")
}, 100000)

test('blog post creation without likes, defaults to 0', async () => {
  const newBlog = {
    title: "Sin Likes",
    author: "Autor Unlike",
    url: "blog.com/0like",
  }

  await api.post('/api/blogs')
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const content = response.body.filter(r => r.title === newBlog.title)

  expect(content[0].likes).toBe(0)
}, 100000)

afterAll(async () => {
  await mongoose.connection.close()
})