const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema for Business
let ProductList = new Schema({
item_type: {
type: String
},
KC_Code: {
type: String
},
product: {
type: String
},
fabric: {
type: String
},
work_type: {
type: String
},
price: {
type: Number
},
 fileupload: {
 type: String,
 },
},{
collection: 'productlist'
});
var ProductList1 = mongoose.model('KC', ProductList);


  module.exports = {
    ProductList:ProductList1,
  };