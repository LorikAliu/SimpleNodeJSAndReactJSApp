const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
//   productPhoto: { type: String, required: true },
  productTitle: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  productStock: { 
    type: Number, 
    required: true 
  }
});

module.exports = mongoose.model("Product", productSchema);
