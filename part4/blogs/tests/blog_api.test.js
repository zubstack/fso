const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog.js')
const blogs_data = require('../utils/blogs_data.js')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  let newBlog = new Blog(blogs_data[0])
  await newBlog.save()
  newBlog = new Blog(blogs_data[1])
  await newBlog.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, 2)
})

after(async () => {
  await mongoose.connection.close()
})
