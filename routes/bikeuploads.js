const {VehicleUploads,validate} = require('../models/bikeupload')
const express = require('express');
const router = express.Router();
const multer=require('multer');
const app = express();
const bodyParser=require('body-parser');
app.use(bodyParser.json());
let DIR='./attach/bikexImages';

//for file upload with multer
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,DIR)
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+ '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
  }) 
let upload = multer({ storage: storage }).array('Image', 10);

router.post('/',(req, res) => {


  upload(req,res,function(err)
    {
      var arr = []
      for (var i in req.files){
       arr.push(req.files[i].filename)
      }
 console.log(req)
      if(err)
      {res.json({'err':1,'msg':'Unexpected error!', err})}
      else
        {
        const { error } = validate(req.body); 
        if (error) return res.status(400).send({"err": 1 , "msg" : error.details[0].message});
            
        let vehicleUploads = new VehicleUploads({
              vehicle_id: req.body.vehicle_id,
              images:arr,
              });

        vehicleUploads = vehicleUploads.save(); //saving the banner
         if(err){}
            else
            {
               res.json({'err':0,'msg':'Tada! Vehicle Image Saved'})
            }; 
        };
    });
});

router.get('/', async (req, res) => {
    const vehicleuploads = await VehicleUploads.find();
    res.send({"err":0,"data":vehicleuploads});
  });

  router.get('/:id', async (req, res) => {
    const vehicleuploads = await VehicleUploads.find({'vehicle_id': req.params.id});
    if(vehicleuploads){
      res.send({"err":0,"data":vehicleuploads});
    }else{
      res.send({"err":1,"data":'No datas Found'});
    }
  });
  
  router.delete('/:id', async (req, res) => {
    const vehicleuploads = await VehicleUploads.findByIdAndRemove(req.params.id);
    if (!vehicleuploads) return res.status(404).send('The vehicle with the given ID was not found.');
  
    res.send(vehicleuploads);
  });


module.exports = router;