'use strict'
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  owner_name: {
    type: String,
    trim: true,
    required: true,
  },
  model: {
    type:String,
    enum:[
      'Gulfstream G650',
      'CessnaA-37 Dragonfly',
      'Cessna Citation Encore'
    ],
    required:true
  },
  seat_capacity:{
    type: Number,
    required: true
  },
  manufactured_date:{
    type: Date,
    required:true
  },
  purchase_price:{
    type:Number,
    required:true
  },
  broker_email:{
    type:String,
    required:true,
    validate: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  },
  annual_premium:{
    type:Number
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

mongoose.model('Quote', schema)
