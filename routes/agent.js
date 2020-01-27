const {Agent, validate} = require('../models/agents')
const express = require('express');
const router = express.Router();
var passwordHash = require('password-hash');

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send({"err": 1 , "msg" : error.details[0].message});
  
    let agent = new Agent({ 
    agent_username: req.body.agent_username,
    password: passwordHash.generate(req.body.password),
    email: req.body.email,
    phone: req.body.phone,
    designation: req.body.designation,
    });
    agent = await agent.save();
    res.send({"err": 0, "agent": agent});
  }); 

router.get('/', async (req, res) => {
    const agents = await Agent.find();
    res.send(agents);
  });

  router.post('/changepassword', async (req, res) => {
     const agent = await Agent.find({"_id": req.body.id});
     if(agent){
       for( var i in agent){
         if(passwordHash.verify(req.body.currentpassword,agent[i].password)){
           const agentupdated = await Agent.findByIdAndUpdate(req.body.id,
             {
               password: passwordHash.generate(req.body.newpassword)
           },{new: false})

           if(!agentupdated) return res.status(404).send('Some error occured.');
           
           res.send({err:0,msg:'Password Changed',agentupdated});
          
         }else{
           res.send({err:1,msg:'Invalid Password'});
         }
       }
     }
   })

  router.post('/validate', async (req, res) => {

    const admin = await Agent.find({"email":req.body.email});
    if(admin){
      for( var i in admin){
        if(passwordHash.verify(req.body.password,admin[i].password)){
          res.send({err:0,msg:'Sucessfull', data:admin});
        }else{
          res.send({err:1,msg:'Invalid Password'});
        }
      }
    }
      res.send({err:1,msg:'Email is not registered with us..'});
  });

  


module.exports = router;
