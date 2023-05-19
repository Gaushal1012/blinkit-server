const mongoose = require("mongoose");

const coupenSchema = new mongoose.Schema({
  image:{
    type: String,
    default: ''
  },
  off:{
    type: String,
    default: 'Flat 8% off'
  },
  desc:{
    type: String,
    default: 'No min txn'
  },
  code:{
    type:String,
    default:'GAUSHAL1012'
  }
});

const Coupen = mongoose.model("Coupen", coupenSchema);
module.exports = Coupen;