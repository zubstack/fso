require('dotenv').config({quiet:true})
const mongoose = require('mongoose')

const DB_URL = process.env.DATABASE_URL

const connectDB = () => {
  mongoose.connect(DB_URL)
    .then(() => {
      console.log('MongoDB Atlas Connected successfully')
    })
    .catch((error) => {
      console.error(`Error connecting to MongoDB Atlas: ${error.message}`)
      process.exit(1)
    })
}

// Schema Definition

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    min: 5
  },
  number: {
    type: String,
    unique:false,
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d{7,8}$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'phone number required']
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)

connectDB()

module.exports = Person
