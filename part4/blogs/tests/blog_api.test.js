const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const Blog = require('../models/blog.js')
const blogs_data = require('../utils/blogs_data.js')
const helper = require('./helper_test.js')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = blogs_data.map(b => new Blog(b))
  const promiseArray = blogObjects.map(b => b.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, blogs_data.length)
})

test('blogs contain \'id\' field as identifier', async () => {
  const response = await api.get('/api/blogs')
  assert.equal(Object.keys(response.body[0]).includes('id'), true)
  assert.equal(Object.keys(response.body[0]).includes('_id'), false)
})

describe('creating a new blog', () => {
  test('a valid blog can be created', async () => {
    const newBlog = {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
    }
    const responseBefore = await helper.blogsInDb()
    const lenghtBefore = responseBefore.length
    const postResponse = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const responseAfter = await helper.blogsInDb()
    const responseTitles = responseAfter.map(blog => blog.title)
    assert.strictEqual(lenghtBefore + 1, responseAfter.length)
    assert.strictEqual(newBlog.title, postResponse.body.title)
    assert.strictEqual(responseTitles.includes(newBlog.title), true)
  })

  test('check default likes values to 0 when post request', async () => {
    const newBlog = {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    }
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
    assert.strictEqual(response.body.likes, 0)
  })

  test('blog with missing field is not created', async () => {
    const newBlog = {
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    const response = await helper.blogsInDb()
    assert.strictEqual(response.length, blogs_data.length)
  })
})

describe('deleting blogs', () => {
  test('a blog can be deleted', async () => {
    const responseBefore = await helper.blogsInDb()
    const idDeleted = responseBefore[0].id
    const deletedBlog = await api
      .delete(`/api/blogs/${idDeleted}`)
      .expect(200)
    assert.strictEqual(deletedBlog.body.id, idDeleted)
    const responseAfter = await helper.blogsInDb()
    assert.strictEqual(responseBefore.length - 1, responseAfter.length)
    const stillExisting = responseAfter.some((blog) => blog.id == idDeleted)
    assert.strictEqual(stillExisting, false)
    await api
      .delete(`/api/blogs/${idDeleted}`)
      .expect(404)
  })
})

describe('updating blogs', () => {
  test('updates "likes" field', async () => {
    const updatePayload = {
      likes: 100
    }
    const response = await helper.blogsInDb()
    const idUpdated = response[0].id
    const updatedBlog = await api
      .patch(`/api/blogs/${idUpdated}`)
      .send(updatePayload)
      .expect(200)
    assert.strictEqual(updatedBlog.body.likes, updatePayload.likes)
  })
})

after(async () => {
  await mongoose.connection.close()
})
