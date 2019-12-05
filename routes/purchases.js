
const express = require('express');
const {Purchase, validate} = require('../models/purchase')
const {Procured} = require('../models/procurements')
const router = express.Router();
var multer  = require('multer')
 

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send({"err": 1 , "msg" : error.details[0].message});
  console.log(req.body.vehicle_id)
  const purchase_history = await Procured.find({"vehicle_id":req.body.vehicle_id});
          for(var i in purchase_history){
            if(purchase_history[i].status == 3){
              let purchase = new Purchase({
                customer_id:req.body.customer_id,
                vehicle_id:req.body.vehicle_id,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                phone: req.body.phone,
                email: req.body.email,
                amount:req.body.amount,
                address1:req.body.address1,
                address2:req.body.address2,
                town:req.body.town,
                state:req.body.state,
                postalcode: req.body.postalcode,
                payment_status:0
            });
            purchase = await purchase.save();
            res.send(purchase);
       }else{
        res.send({err: 1, "msg":"The vehicle you are looking is unavailable."}); 
       }
      } 
  });
  router.get('/', async (req, res) => {
    const purchase = await Purchase.find();
    res.send(purchase);
  });

  router.put('/:id', async (req, res) => {
      const purchase = await Purchase.findByIdAndUpdate(req.params.id,
        { 
            razorpay_order_id:req.body.razorpay_order_id,
            razorpay_payment_id:req.body.razorpay_payment_id,
            razorpay_signature:req.body.razorpay_signature,
            payment_status:req.body.payment_status
        }, { new: false });
      if (!purchase) return res.status(404).send('The purchase with the given ID was not found.');
      res.send(purchase);
})
  router.get('/:id', async (req, res) => {
    const purchase = await Purchase.findById(req.params.id);
    res.send(purchase);
  });
  
  router.get('/customer/:id', async (req, res) => {
    const purchase_history = await Purchase.find({"customer_id": req.params.id});
    res.send(purchase_history);
  });

module.exports = router;
