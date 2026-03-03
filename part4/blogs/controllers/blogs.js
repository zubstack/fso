const Blog = require('../models/blog.js')
const express = require('express')
const router = express.Router()

router.get('/', async (request, response) => {
  const result = await Blog.find({})
  response.json(result)
})

router.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const result = await blog.save()
  response.status(201).json(result)
})

router.delete('/:id', async (request, response) => {
  const deletedBlog = await Blog.findByIdAndDelete(request.params.id);
  if (!deletedBlog) {
    return response.status(404).json({ message: 'Blog not found' });
  }
  response.json(deletedBlog)
})

router.patch('/:id', async (request, response) => {
  const updatedItem = await Blog.findByIdAndUpdate(
    request.params.id,
    { $set: request.body }, // Only updates fields passed in req.body
    { returnDocument: 'after', runValidators: true } // runValidators ensures schema rules apply
  )

  if (!updatedItem) return response.status(404).json({ message: 'Blog not found' });
  response.json(updatedItem);
})

module.exports = router
