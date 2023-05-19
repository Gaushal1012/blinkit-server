const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
  },
  color: { //#00123
    type: String,
  }
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;