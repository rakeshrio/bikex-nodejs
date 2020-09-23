const {Broker, validate} = require('../models/broker')
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send({"err": 1 , "msg" : error.details[0].message});
    
    const brokerData = await Broker.findOne({'email': req.body.email});

    if(brokerData){
        res.status(409).send({'msg':'Email already in use!'})
    }else{

    let broker = new Broker({ 
        name:req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        alternate_phone: req.body.alternate_phone,
        status:req.body.status,
        jobs: req.body.jobs,
        tags: req.body.tags,
    });
    broker.save().then(x=>{
        res.statue(201).send({"err": 0, "msg": 'Data entered',"response":x});
    }).catch(x=>{
        res.status(500).send({"err": 1, "msg": x});
    })
    
    }
  });

router.get('/', async (req, res) => {
    const broker = await Broker.find().sort( { date: -1 });
    res.status(200).send(broker);
  });

router.get('/:id', async (req, res) => {
    await Broker.find({"_id":req.params.id}).then(x=>{
        if(x.length > 0){
            res.status(200).send({"err": 0,"response":x});
        }else{
            res.status(404).send({"err": 1,"response":`Entry with ID '${req.params.id}' not found.`});
        }
    }).catch(x=>{
        res.status(500).send({"err": 1, "msg": x});
    })
    
  });

router.put('/:id', async (req, res) => {
    const broker = await Broker.findByIdAndUpdate(req.params.id,
        {
            name:req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            alternate_phone: req.body.alternate_phone,
            status:req.body.status,
            jobs: req.body.jobs,
            tags: req.body.tags,
        },{ new: false })
    
        if(!broker){
            res.status(404).send({"err": 1,"response":`Entry with ID '${req.params.id}' not found.`});
        }
        res.status(200).send({"err": 0,"response":broker}); 
})

router.delete('/:id', async (req, res) => {
    const broker = await Broker.findByIdAndDelete(req.params.id)
    if(!broker){
        res.status(404).send({"err": 1,"response":`Entry with ID '${req.params.id}' not found.`});
    }    
        res.status(200).send({"err": 0,"response":broker});  
  });

module.exports = router;
