const mongoose = require('mongoose');
const Joi = require('joi');

const brokerSchema = new mongoose.Schema({

    name:String,
    email: String,
    phone: Number,
    alternate_phone: Number,
    status:{ type:Number, default:0},
    jobs: String,
    tags: String,
    createdAt: { type:Date, default:Date.now},
    updatedAt: { type:Date, default:Date.now}
});
const Broker = mongoose.model('broker_list', brokerSchema)

function validateBroker(broker) {
    const schema = {
    name:Joi.string().min(1).max(50).required(),
    email: Joi.string().min(1).max(50).required(),
    phone: Joi.number().required(),
    alternate_phone: Joi.number(),
    status: Joi.number(),
    jobs: Joi.string().min(1).max(50).required(),
    tags: Joi.string(),
    };
  
    return Joi.validate(broker, schema);
  }
module.exports.Broker = Broker;
module.exports.validate = validateBroker;