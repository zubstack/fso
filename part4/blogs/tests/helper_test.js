const Blog = require('../models/blog.js')

const blogsInDb = async () => {
  return await Blog.find({})
}

module.exports = { blogsInDb }
