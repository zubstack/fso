
const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app.js')
const User = require('../models/user.js')
const users_data = require('./users.data.js')
const helper = require('./helper_test.js')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const userObjects = users_data.map(b => new User(b))
  const promiseArray = userObjects.map(b => b.save())
  await Promise.all(promiseArray)
})

describe('query users information', () => {
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all users are returned', async () => {
    const response = await api.get('/api/users')
    assert.strictEqual(response.body.length, users_data.length)
  })

})

describe('creating a new user', () => {
  test('a valid user can be created', async () => {
    const newUser = {
      username: "meldow",
      name: "Mark Tarts",
      password: "admin123"
    }
    const responseBefore = await helper.usersInDb()
    const lenghtBefore = responseBefore.length
    const postResponse = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const responseAfter = await helper.usersInDb()
    const responseTitles = responseAfter.map(user => user.username)
    assert.strictEqual(lenghtBefore + 1, responseAfter.length)
    assert.strictEqual(newUser.username, postResponse.body.username)
    assert.strictEqual(responseTitles.includes(newUser.username), true)
  })

  test('user with missing fields is not created', async () => {
    const newUser = {
      password: 'admin123'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    const response = await helper.usersInDb()
    assert.strictEqual(response.length, users_data.length)
  })

  test('user with repeated `username` field cannot be created.', async () => {
    const existingUsername = await helper.getExistingUser().username
    const newUser = {
      username: existingUsername,
      name: "Mark Tarts",
      password: 'admin123'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    const response = await helper.usersInDb()
    assert.strictEqual(response.length, users_data.length)
  })
  test('`password` field should be at least 3 chars long', async () => {
    const newUser = {
      username: "silver",
      name: "Mark Tarts",
      password: 'du'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    const response = await helper.usersInDb()
    assert.strictEqual(response.length, users_data.length)
  })

})

describe('deleting users', () => {

})

describe('updating users', () => {

})

after(async () => {
  await mongoose.connection.close()
})
