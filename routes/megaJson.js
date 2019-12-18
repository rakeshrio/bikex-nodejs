const {Procured} = require('../models/procurements')
const {Modals} = require('../models/modals')
const {VehicleUploads} = require('../models/bikeupload')
const {VehicledisplayUploads} = require('../models/bikedisplayupload')
const express = require('express');
const router = express.Router();
const app = express();
var _ = require('lodash');


router.get('/', async (req, res) => {
  Procured.aggregate([{
    $lookup: {
            from: 'modals',
            localField: "model_id",
            foreignField: "_id",
            as: "model"
        }
}])


 console.log(Procured)
  
    res.send(Procured);
  });

module.exports = router;
