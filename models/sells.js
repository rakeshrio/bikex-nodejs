const mongoose = require('mongoose');
const Joi = require('joi');

const sellSchema = new mongoose.Schema({
    bike_name:String,
    make:String,
    model: String,
    engine_cc: String,
    make_year: String,
    km_run: String,
    vehicle_no: String,
    name: String,
    mobile: Number,
    city: String,
    state: String,
    date: { type:Date, default:Date.now},
});
const Sell = mongoose.model('sells', sellSchema)

function validateSell(sell) {
    const schema = {
    bike_name: Joi.string().min(1).max(50).required(),
    make:Joi.string().min(1).max(50).required(),
    model: Joi.string().min(1).max(50).required(),
    engine_cc: Joi.string().min(1).max(100).required(),
    make_year: Joi.string().min(1).required(),
    km_run: Joi.string().min(1).max(50).required(),
    vehicle_no: Joi.string().min(1).max(50).required(),
    name: Joi.string().min(1).max(50).required(),
    mobile: Joi.number().required(),
    city: Joi.string().min(1).max(50).required(),
    state: Joi.string().min(1).max(50).required(),
    };
  
    return Joi.validate(sell, schema);
  }
module.exports.Sell = Sell;
module.exports.validate = validateSell;