const mongoose = require('mongoose');
const Joi = require('joi');

const sellSchema = new mongoose.Schema({

    make:String,
    model: String,
    engine_cc: String,
    manufacture_year: String,
    km_run: {type:String, default:'NA'},
    vehicle_no: {type:String, default:'NA'},
    name: String,
    seen:{ type:Number, default:0},
    mobile: Number,
    city: String,
    state: {type:String, default:'NA'},
    date: { type:Date, default:Date.now},
});
const Sell = mongoose.model('sells', sellSchema)

function validateSell(sell) {
    const schema = {
    make:Joi.string().min(1).max(50).required(),
    model: Joi.string().min(1).max(50).required(),
    engine_cc: Joi.string().min(1).max(100).required(),
    manufacture_year: Joi.string().min(1).required(),
    km_run: Joi.string(),
    vehicle_no: Joi.string(),
    name: Joi.string().min(1).max(50).required(),
    mobile: Joi.number().required(),
    city: Joi.string().min(1).max(50).required(),
    state: Joi.string(),
    };
  
    return Joi.validate(sell, schema);
  }
module.exports.Sell = Sell;
module.exports.validate = validateSell;