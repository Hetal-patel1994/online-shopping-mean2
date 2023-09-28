const express = require('express');
const app = express();
const loginRoutes = express.Router();
const multer = require('multer');

// Require Business model in our routes module
let {AdLoginDetails} = require('../models/Login');



loginRoutes.route('/login').post(function (req, res) {
  let adlogindetails = new AdLoginDetails(req.body);
  adlogindetails.save()
    .then(game => {
    res.status(200).json({'adlogindetails': 'AdUnit in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

loginRoutes.route('/logindata').get(function (req, res) {
  AdLoginDetails.find(function (err, adlogindetails){
    if(err){
      console.log(err);
    }
    else {
      res.json(adlogindetails);
    }
  });
});

module.exports = loginRoutes;