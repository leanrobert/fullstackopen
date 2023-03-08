const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('should return blog list as JSON', async () => {
  await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
}, 100000)

test('identifier field should be named id, not _id', async () => {
  const blogs = await api.get('/api/blogs')
  expect(blogs.body[0].id).toBeDefined()
}, 100000)

afterAll(async () => {
  await mongoose.connection.close()
})