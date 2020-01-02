
const express = require('express');
const {Customer, validate} = require('../models/customers')
const router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: 'attach/' })
var passwordHash = require('password-hash');


// var msg91 = require("msg91")("310801AwwK4rO25e0af36eP1", "MBIKEX", "4" );


router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send({"err": 1 , "msg" : error.details[0].message});
    let customer = new Customer({ 
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phone: req.body.phone,
      email: req.body.email,
      password: passwordHash.generate(req.body.password),
    });
    customer = await customer.save();
    // msg91.send(req.body.phone,"Hi "+req.body.firstname+", Thanks for creating an account on BikeX. Now browse from variety of two-wheeler only at bikex.in.", function(err, response){
      res.send({"err": 0, "customer": customer, "message":response});
    // });
  });
  router.get('/', async (req, res) => {
    const customers = await Customer.find();
    res.send(customers);
  });

  router.get('/:id', async (req, res) => {
    const customers = await Customer.findById(req.params.id);
    res.send(customers);
  });

 
  router.post('/validate', async (req, res) => {

    const customers = await Customer.find({"email":req.body.email});
    if(customers){
      for( var i in customers){
        if(req.body.password == customers[i].password){
          res.send({err:0,msg:'Sucessfull', data:customers});
        }else{
          res.send({err:1,msg:'Invalid Password'});
        }
      }
    }
      res.send({err:1,msg:'Email is not registered with us..'});
  });

router.post('/emailverify', async (req, res) => {

  const customers = await Customer.find({"email":req.body.email});
  if(customers.length != 0){
    res.send({err:1,msg:'Email already exists.'});
  }
    res.send({err:0,msg:'Available'});
});
  
module.exports = router;
