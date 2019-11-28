const mongoose = require('mongoose');
const Joi = require('joi');

const refurbishSchema = new mongoose.Schema({
    vehicle_number:String,
    center_code:Number,
    make: String,
    type_of_vehicle: String,
    model_name:String,
    check_for:String,
    parts_changed:Array,
    comments:String,
    date: { type:Date, default:Date.now},
    updated: { type:Date, default:Date.now}
});
const Refurbished = mongoose.model('refurbished_list', refurbishSchema)

function validateRefurbishment(refurbish) {
    const schema = {
    vehicle_number: Joi.string().min(1).max(50).required(),
    center_code: Joi.required(),
    make: Joi.string().min(1).max(100).required(),
    type_of_vehicle: Joi.string().min(1).max(100),
    model_name: Joi.string().min(1).max(100),
    check_for: Joi.string().min(1).max(100),
    parts_changed: Joi.string().min(1).max(100),
    comments: Joi.string().min(1).max(100),
    date:Joi.date(),
    updated: Joi.date()
    };
  
    return Joi.validate(refurbish, schema);
  }
module.exports.Refurbished = Refurbished;
module.exports.validate = validateRefurbishment;