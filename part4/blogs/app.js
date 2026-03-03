
const express = require('express')
const mongoose = require('mongoose')
const { MONGODB_URI } = require('./utils/config.js')
const logger = require('./utils/logger.js')
const { errorHandler, requestLogger, unknownEndpoint } = require('./utils/middleware.js')

const blogsRouter = require('./controllers/blogs.js')

const app = express()

logger.info('connecting to ', MONGODB_URI)

mongoose.connect(MONGODB_URI, { family: 4 })
  .then(() => {
    logger.info('connected to database')
  })
  .catch((error) => {
    logger.error('error connection to database', error.message)
  })

app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
