const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema for Business

let AdLoginDetails = new Schema({
    user_name: {
      type: String
    },
    user_password: {
      type: String
    }
  },{
      collection: 'adlogindetails'
  });
  
  var AdLoginDetails1 = mongoose.model('AdLoginDetails', AdLoginDetails);

  module.exports = {
    AdLoginDetails:AdLoginDetails1
  };