const mongoose = require('mongoose')

const templateSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a name'],
    },
    subject: {
      type: String,
      required: [true, 'Please enter a subject'],
    },
    body: {
      type: String,
      required: [true, 'Please enter a body content'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Template', templateSchema)
