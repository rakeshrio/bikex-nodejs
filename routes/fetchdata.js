const {Procured, validate} = require('../models/procurements')
const express = require('express');
const router = express.Router();
var multer  = require('multer')
const app = express();

router.get('/procured-vehicle', async (req, res) => {
    const procured = await Procured.find({"status":0});
   setTimeout(()=>{
    res.send(procured);
   })
});
router.get('/under-refurbish', async (req, res) => {
    const procured = await Procured.find({"status":1});
   setTimeout(()=>{
    res.send(procured);
   })
});

router.get('/instock-vehicle', async (req, res) => {
    const procured = await Procured.find({"status":2});
    res.send(procured);
});
router.get('/live-vehicle', async (req, res) => {
    const procured = await Procured.find({"status":{ $in: [3, 4]}
    }).populate({
        path:'model_id',
        select:'-_id -date -updated'
    })
    .select('-status -rc_card -documents -imageUpload -vehicle_number -manufacture_year -fines -source -city -pincode -state -address -insurance -b_extract -hypothecation -regn_no -chassis_no -rc_start -rc_end -insurance_start -insurance_end -remark -procured_date -procured_price -refurbishment_received -live_date -date -updated -_id')
    res.send(procured);
});
router.get('/booked-vehicle', async (req, res) => {
    const procured = await Procured.find({"status":4});
    res.send(procured);
});
router.get('/sold-vehicle', async (req, res) => {
    const procured = await Procured.find({"status":5});
    res.send(procured);
});
router.get('/all-purchase', async (req, res) => {
    const procured = await Procured.find({"status":{ $in: [4, 5]}});
    res.send(procured);
});
router.get('/sold-vehicle-length', async (req, res) => {
    const procured = await Procured.find({"status":5});
    var length = procured.length
    res.send({"total":length});
});
router.get('/booked-vehicle-length', async (req, res) => {
    const procured = await Procured.find({"status":4});
    var length = procured.length
    res.send({"total":length});
});

router.get('/total-vehicle-length', async (req, res) => {
    const procured = await Procured.find();
    var length = procured.length
    res.send({"total":length});
});

router.get('/similar-vehicle', async (req, res) => {
    const procured = await Procured.find({"vehicle_id": { $ne: req.query.v_id}}).limit(50);
    res.send(procured);
});

module.exports = router;