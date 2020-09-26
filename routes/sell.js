const {Sell, validate} = require('../models/sells')
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send({"err": 1 , "msg" : error.details[0].message});
  
    let sell = new Sell({ 
        make: req.body.make,
        model:  req.body.model,
        engine_cc:  req.body.engine_cc,
        manufacture_year:  req.body.manufacture_year,
        name:  req.body.name,
        mobile: req.body.mobile,
        city:  req.body.city,
    });
    sell = await sell.save();
    res.send({"err": 0, "msg": 'We have receive your request, our team will contact you soon'});
  });

  router.get('/', async (req, res) => {
    const sell = await Sell.find().sort( { date: -1 });
    res.send(sell);
  });

  router.get('/notseen', async (req, res) => {
    const sell = await Sell.find({"seen":0});
    var length = sell.length
    res.send({"total":length});
  });

  router.put('/:id', async (req, res) => {
    const sell = await Sell.findByIdAndUpdate(req.params.id,
      {
        seen:1,
    }, { new: false });
    if (!sell) return res.status(404).send('The sell with the given ID was not found.');
    res.send(sell);
  })

  router.put('/changstatus/:id', async (req, res) => {

    if(req.body.status == 1){
      const sell = await Sell.findOneAndUpdate({"_id":req.params.id},
      {
        status:req.body.status,
        comment: req.body.comment,
        call_status: req.body.call_status,
        next_call_date:req.body.next_call_date,
        expected_price:req.body.expected_price,
        offered_price:req.body.offered_price,
        inspection:req.body.inspection
      },{ new: false });

      if(!sell){
        res.send({"msg":"Given ID not found!"})
      }else{
        res.send(sell);
      }
    }else if(req.body.status == 2){
      const sell = await Sell.findOneAndUpdate({"_id":req.params.id},
      {
        status:req.body.status,
        comment: req.body.comment,
        procured_status:req.body.procured_status,
      },{ new: false });

      if(!sell){
        res.send({"msg":"Given ID not found!"})
      }else{
        res.send(sell);
      }
    }else{
      const sell = await Sell.findOneAndUpdate({"_id":req.params.id},
      {
        status:req.body.status,
        comment: req.body.comment,
      },{ new: false });

      if(!sell){
        res.send({"msg":"Given ID not found!"})
      }else{
        res.send(sell);
      }
    }

    
  }); 




module.exports = router;
