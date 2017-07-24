'use strict'
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  email: {
    type:String
  },
  quotes: [
    {
      quote: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quote',
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

mongoose.model('Batch', schema)
