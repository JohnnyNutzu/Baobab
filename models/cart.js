const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    data: Buffer,
    contentType : String
  },
  color :{
      type: String
  }
})


const Cart = mongoose.model('Cart', cartSchema);
module.exports = Product;