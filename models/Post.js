const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({

  year: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    require: true,
  },
  cats: {
    type: String,
    require: true,
  },
  body: {
    type: String,
    require: true,
  },
  drive: {
    type: String,
    require: true,
  },
  mileage: {
    type: String,
    require: true,
  },
  zip: {
    type: String,
    require: true
  },
  pickup: {
    type: String,
    require: true
  },
  quoteStatus: {
    type: String,
    require: true,
    default: 'approved'
  },
  quoteValue: {
    type: Number,
    require: true
  },

});

module.exports = mongoose.model("cxQuoteInfo", PostSchema);
