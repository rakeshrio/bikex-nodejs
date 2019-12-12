const {Sell, validate} = require('../models/sells')
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send({"err": 1 , "msg" : error.details[0].message});
  
    let sell = new Sell({ 
        bike_name: req.body.bike_name,
        make: req.body.make,
        model:  req.body.model,
        engine_cc:  req.body.engine_cc,
        make_year:  req.body.make_year,
        km_run:  req.body.km_run,
        vehicle_no:  req.body.vehicle_no,
        name:  req.body.name,
        mobile: req.body.mobile,
        city:  req.body.city,
        state:  req.body.state,
    });
    sell = await sell.save();
    res.send({"err": 0, "msg": 'We have receive your request, our team will contact you soon'});
  });

router.get('/', async (req, res) => {
    const sell = await Sell.find();
    res.send(sell);
  });
module.exports = router;
