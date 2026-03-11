const Blog = require('../models/blog.js')
const User = require('../models/user.js')

const blogsInDb = async () => {
  return await Blog.find({})
}

const usersInDb = async () => {
  return await User.find({})
}

const getExistingUser = async () => {
  return await User.findOne()
}

module.exports = { blogsInDb, usersInDb, getExistingUser }

