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
   setTimeout(()=>{
    res.send(procured);
   })
});
router.get('/live-vehicle', async (req, res) => {
    const procured = await Procured.find({"status":3});
   setTimeout(()=>{
    res.send(procured);
   },1501)
});
module.exports = router;