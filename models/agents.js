const mongoose = require('mongoose');
const Joi = require('joi');

const agentSchema = new mongoose.Schema({
    agent_username:String,
    password:String,
    email: String,
    phone: Number,
    designation: String,
    date: { type:Date, default:Date.now},
});
const Agent = mongoose.model('agents', agentSchema)

function validateAgent(agent) {
    const schema = {
      agent_username: Joi.string().min(5).max(50).required(),
      password:Joi.string().min(5).max(50).required(),
      email: Joi.string().min(5).max(50).required(),
      phone: Joi.number().min(10).required(),
      designation: Joi.string().min(2).max(100).required(),
    };
  
    return Joi.validate(agent, schema);
  }
module.exports.Agent = Agent;
module.exports.validate = validateAgent;