
const express = require('express')
const mongoose = require('mongoose')
const { MONGODB_URI } = require('./utils/config.js')
const logger = require('./utils/logger.js')
const { errorHandler, requestLogger, unknownEndpoint } = require('./utils/middleware.js')

const blogsRouter = require('./controllers/blogs.js')
const usersRouter = require('./controllers/users.js')

const app = express()

logger.info('connecting to ', MONGODB_URI)

  ; (async () => {
    try {
      await mongoose.connect(MONGODB_URI);
      logger.info('Successfully connected to database');
    } catch (error) {
      logger.error('Initial connection failed:', error.message);
      process.exit(1);
    }
  })()

app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
