const {Agent, validate} = require('../models/agents')
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send({"err": 1 , "msg" : error.details[0].message});
  
    let agent = new Agent({ 
    agent_username: req.body.agent_username,
    password: req.body.password,
    email: req.body.email,
    phone: req.body.phone,
    designation: req.body.designation,
    });
    agent = await agent.save();
    res.send({"err": 0, "agent": agent});
  });

router.get('/', async (req, res) => {
    const agents = await agent.find();
    res.send(agents);
  });
  router.post('/validate', async (req, res) => {

    const customers = await Customer.find({"email":req.body.email});
    if(customers){
      for( var i in customers){
        if(req.body.password == customers[i].password){
          res.send({err:0,msg:'Sucessfull', data:customers});
        }else{
          res.send({err:1,msg:'Invalid Password'});
        }
      }
    }
      res.send({err:1,msg:'Email is not registered with us..'});
  });
module.exports = router;
