const mongoose = require('mongoose');

const Model = mongoose.model('Restaurant', {
  name: String,
  address: String,
  city: String,
  country: String,
  stars: {
    type: Number,
    min: 1,
    max: 3,
  },
  cuisine: String,
  priceCategory: {
    type: Number,
    min: 1,
    max: 3,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Model;
