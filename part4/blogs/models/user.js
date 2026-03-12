
const uniqueValidator = require('mongoose-unique-validator').default
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
}, {
  toJSON: {
    transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret.password;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
    virtuals: true, // Includes virtual properties (like 'id' above)
    getters: true   // Applies any defined getters
  }
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)


