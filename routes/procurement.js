const {Procured, validate} = require('../models/procurements')
const express = require('express');
const router = express.Router();
var multer  = require('multer')
const app = express();
var _ = require('lodash');


let DIR='./attach/documents';
//for file upload with multer
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,DIR)
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+ '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
  })
  
let upload = multer({ storage: storage }).array('Image');

router.post('/', async (req, res) => {
    upload(req,res,async function(err)
    {
      var documents = []
      for (var i in req.files){
       documents.push(req.files[i].filename)
      }

     if(err)
       {}
        else
          {
          const { error } = validate(req.body); 
          if (error) return res.status(400).send({"err": 1 , "msg" : error.details[0].message});

          const procured_list = await Procured.find();
          const id = _.findLast(procured_list, function(n) {
            return n.vehicle_id;
          });
          if(!id){ids = 100}
          else{ids = id.vehicle_id}

          let procured = new Procured({
            vehicle_id : Number(ids)+1,
            vehicle_number:req.body.vehicle_number,
            model_id:req.body.model_id,
            manufacture_year:req.body.manufacture_year,
            color:req.body.color,
            fines: req.body.fines,
            source: req.body.source,
            city: req.body.city,
            pincode: req.body.pincode,
            state: req.body.state,
            address:req.body.address,
            rc_card: req.body.rc_card,
            insurance:req.body.insurance,
            b_extract:req.body.b_extract,
            hypothecation:req.body.hypothecation,
            documents:documents,
            regn_no:req.body.regn_no,
            chassis_no:req.body.chassis_no,
            insurance_policy_number:req.body.insurance_policy_number,            
            rc_start:req.body.rc_start,
            rc_end:req.body.rc_end,
            insurance_start:req.body.insurance_start,
            insurance_end:req.body.insurance_end,
            remarks: req.body.remarks,
            procured_date: req.body.procured_date,
            procured_price: req.body.procured_price,
            selling_price: req.body.selling_price,
            });           
        procured =  procured.save();
        if(err){}
          else
          {
          res.json({'err':0,'msg':'Procured', 'procured_list':procured})
          } 
      }
    });
});

router.get('/', async (req, res) => {
    const procured = await Procured.find();
   setTimeout(()=>{
    res.send(procured);
   })
});

router.get('/:id', async (req, res) => {
  const procured = await Procured.find({'vehicle_id': req.params.id});
 setTimeout(()=>{
  res.send(procured);
 })
});

router.put('/:id', async (req, res) => {
  console.log(req.body.updated)
  const { error } = validate(req.body); 
  if (error) return res.status(400).send({"err": 1 , "msg" : error.details[0].message});
  const procured = await Procured.findByIdAndUpdate(req.params.id,
    { 
      vehicle_number:req.body.vehicle_number,
      make:req.body.make,
      modal:req.body.modal,
      manufacture_year:req.body.manufacture_year,
      color:req.body.color,
      fines: req.body.fines,
      source: req.body.source,
      city: req.body.city,
      pincode: req.body.pincode,
      state: req.body.state,
      address:req.body.address,
      rc_card: req.body.rc_card,
      insurance:req.body.insurance,
      b_extract:req.body.b_extract,
      hypothecation:req.body.hypothecation,
      documents:document,
      regn_no:req.body.regn_no,
      chassis_no:req.body.chassis_no,
      insurance_policy_number:req.body.insurance_policy_number,            
      rc_start:req.body.rc_start,
      rc_end:req.body.rc_end,
      insurance_start:req.body.insurance_start,
      insurance_end:req.body.insurance_end,
      remarks: req.body.remarks,
      procured_date: req.body.procured_date,
      procured_price: req.body.procured_price,
      selling_price: req.body.selling_price,
      updated: req.body.updated
    }, { new: false });

  if (!procured) return res.status(404).send('The procured with the given ID was not found.');
  
  res.send(procured);
});
router.delete('/:id', async (req, res) => {
  const procured = await Procured.findByIdAndRemove(req.params.id);

  if (!procured) return res.status(404).send('The procured with the given ID was not found.');

  res.send(procured);
});

module.exports = router;