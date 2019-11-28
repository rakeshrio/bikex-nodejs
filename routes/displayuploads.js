const {VehicledisplayUploads,validate} = require('../models/bikedisplayupload')
const express = require('express');
const router = express.Router();
const multer=require('multer');
const app = express();
const bodyParser=require('body-parser');
app.use(bodyParser.json());
let DIR='./attach/bikex-Display-Images';

//for file upload with multer
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,DIR)
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+ '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
  }) 
let upload = multer({ storage: storage }).single('Image', 10);

router.post('/',(req, res) => {

  upload(req,res,function(err)
    {

      if(err)
      {res.json({'err':1,'msg':'Unexpected error!', err})}
      else
        {
        const { error } = validate(req.body); 
        if (error) return res.status(400).send({"err": 1 , "msg" : error.details[0].message});
            
        let vehicledisplayUploads = new VehicledisplayUploads({
              vehicle_id: req.body.vehicle_id,
              images:req.file.filename,
              path:req.file.filename
              });

        vehicledisplayUploads = vehicledisplayUploads.save(); //saving the banner
         if(err){}
            else
            {
               res.json({'err':0,'msg':'Tada! Vehicle Profile Uploaded'})
            }; 
        };
    });
});

router.get('/', async (req, res) => {
    const vehicledisplayuploads = await VehicledisplayUploads.find();
    res.send({"err":0,"data":vehicledisplayuploads});
  });

  router.get('/:id', async (req, res) => {
    const vehicleuploads = await VehicledisplayUploads.find({'vehicle_id': req.params.id});
    res.send({"err":0,"data":vehicleuploads});
  });
  
  router.put('/:id', async (req, res) => {
    upload(req,res,async function(err)
    {
      console.log(req.file.filename)
      if(err)
      {res.json({'err':1,'msg':'Unexpected error!', err})}
      else
        {

        const vehicledisplayUploads = await VehicledisplayUploads.findByIdAndUpdate(req.params.id,
          { 
            images:req.file.filename,
            path:req.file.filename
          }, { new: false });
      
        if (!vehicledisplayUploads) return res.status(404).send('The vehicle with the given ID was not found.');
        
        res.send(vehicledisplayUploads);

        }
        })
  });

  router.delete('/:id', async (req, res) => {
    const vehicleuploads = await VehicledisplayUploads.findByIdAndRemove(req.params.id);
  
    if (!vehicleuploads) return res.status(404).send('The vehicle with the given ID was not found.');
  
    res.send(vehicleuploads);
  });


module.exports = router;