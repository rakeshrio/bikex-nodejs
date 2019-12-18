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
    const procured = await Procured.find({"status":{ $in: [3, 4]}});
    res.send(procured);
});
router.get('/sold-vehicle', async (req, res) => {
    const procured = await Procured.find({"status":5});
    res.send(procured);
});
router.get('/similar-vehicle', async (req, res) => {
    const procured = await Procured.find({"vehicle_id": { $ne: req.query.v_id}}).limit(100);
    res.send(procured);
});

module.exports = router;