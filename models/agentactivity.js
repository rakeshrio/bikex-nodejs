const mongoose = require('mongoose');
const Joi = require('joi');

const agentActivitySchema = new mongoose.Schema({
    agent_username:String,
    activity : String,
    date: { type:Date, default:Date.now},
});
const AgentActivity = mongoose.model('agent_activity', agentActivitySchema)

function validateAgentactivity(agentActivity) {
    const schema = {
      agent_username: Joi.string().min(1).max(500).required(),
      activity:Joi.string().min(1).max(500).required(),
    };
  
    return Joi.validate(agentActivity, schema);
  }
module.exports.AgentActivity = AgentActivity;
module.exports.validate = validateAgentactivity;