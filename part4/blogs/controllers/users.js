
const bcrypt = require('bcrypt')
const User = require('../models/user.js')
const express = require('express')
const router = express.Router()

router.get('/', async (request, response) => {
  const result = await User.find({}).populate('blogs')
  response.json(result)
})

router.post('/', async (request, response) => {
  const { password } = request.body
  if (password.length < 3) {
    response.status(400).json({ message: 'password should be at least 3 chars long' })
  }
  const salt = 10
  const hashedPassword = await bcrypt.hash(password, salt)
  const blog = new User({ ...request.body, password: hashedPassword })
  const result = await blog.save()
  response.status(201).json(result)
})

module.exports = router
