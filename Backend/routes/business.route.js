const express = require('express');
const app = express();
const businessRoutes = express.Router();
const multer = require('multer');

// Require Business model in our routes module
let  { ProductList }  = require('../models/Business');


var store = multer.diskStorage({
  destination:function(req,file,cb){
     //local
    //cb(null, './public/assets/');
    //Build
    cb(null, './public/assets/');
  },
  filename:function(req,file,cb){
      cb(null, Date.now()+'.'+file.originalname);
  }
});


var upload = multer({storage:store}).single('file');

businessRoutes.post('/uploads', function(req,res){
  console.log("req"+req);
  upload(req,res,function(err){
      if(err){
          return res.status(501).json({error:err});
      }
      //do all database record saving activity
      console.log("req.file"+JSON.stringify(req.file))
      return res.json({originalname:req.file.originalname, uploadname:req.file.filename,path:req.file.path});
  });
});


// Defined store route
businessRoutes.route('/add').post(function (req, res) {
  let business = new ProductList(req.body);
  business.save()
    .then(business => {
      res.status(200).json(
        {
          'msg': 'Item Added Successfully',
          'status' : 'Success'
    });
    })
    .catch(err => {
    res.status(400).json({
      'msg': 'Unable to Add Item in Database',
      'status' : 'Failure'
});
    });
});

// Defined get data(index or listing) route
businessRoutes.route('/view').get(function (req, res) {
  ProductList.find(function (err, businesses){
    if(err){
     // console.log("error___"+err);
    }
    else {
      res.json(businesses);
    }
  });
});

// Defined edit route
businessRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  ProductList.findById(id, function (err, business){
      res.json(business);
  });
});

//  Defined update route
businessRoutes.route('/update/:id').post(function (req, res) {
  ProductList.findById(req.params.id, function(err, business) {
    if (!business)
      return next(new Error('Could not load Document'));
    else {
        business.item_type = req.body.item_type;
        business.KC_Code = req.body.KC_Code;
        business.product = req.body.product;
        business.fabric = req.body.fabric;
        business.work_type = req.body.work_type;
        business.price = req.body.price;
        business.fileupload = req.body.fileupload;

        business.save().then(business => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
businessRoutes.route('/delete/:id').get(function (req, res) {
  ProductList.findByIdAndRemove({_id: req.params.id}, function(err, business){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = businessRoutes;