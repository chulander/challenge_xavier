'use strict'
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    validate: /\S+/
  },
  message:{
    type: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  editedBy: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }]
}, {
  timestamps: true
})

mongoose.model('Blog', schema)
