const {Finance, validate} = require('../models/finances')
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send({"err": 1 , "msg" : error.details[0].message});
  
    let finance = new Finance({ 
        first_name:req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        mobile: req.body.mobile,
        pincode: req.body.pincode,
        dob: req.body.dob,
        annual_income: req.body.annual_income,
        vehicle: req.body.vehicle,
    });
    finance = await finance.save();
    res.send({"err": 0, "msg": 'We have receive your request, our team will contact you soon'});
  });

router.get('/', async (req, res) => {
    const finance = await Finance.find().sort( { seen: 1 } );
    res.send(finance);
  });

  router.put('/:id', async (req, res) => {
    const finance = await Finance.findByIdAndUpdate(req.params.id,
      {
        seen:1,
    }, { new: false });
    if (!finance) return res.status(404).send('The finance with the given ID was not found.');
    res.send(finance);
  })
module.exports = router;
