const mongoose = require('mongoose');
const Joi = require('joi');


const modalsSchema = new mongoose.Schema({
    _id:{
      type:Number,
    },
    modal_name:String,
    make:String,
    engine_cc: String,
    fuel_type: String,
    vehicle_type:String,
    power: String,
    fuel_system: String,
    abs: String,
    mileage:String,
    number_of_gears:String,
    transmission_type:String,
    wheel_type:String,
    tyre_type: String,
    tank_capacity:Number,
    front_brake_type:String,
    rear_brake_type:String,
    cooling_system:String,
    starting:String,
    drive_type:String,
    console:String,
    kerb_weight: String,  
    comments:String,
    date: { type:Date, default:Date.now},
    updated: { type:Date, default:Date.now}
});
const Modals = mongoose.model('modals', modalsSchema)

function modalsValidate(modal) {
    const schema = {
    _id: Joi.number(),
    modal_name: Joi.string().min(1).max(50).required(),
    make: Joi.string().min(1).max(50).required(),
    engine_cc: Joi.string().min(1).max(50).required(),
    fuel_type: Joi.required(),
    vehicle_type: Joi.required(),
    power: Joi.string().min(1).max(50).required(),
    fuel_system: Joi.string().min(1).max(100).required(),
    abs:Joi.string().required(),
    mileage: Joi.string().min(1).max(100).required(),
    number_of_gears: Joi.string().min(1).max(100),
    transmission_type: Joi.string().min(1).max(100),
    wheel_type: Joi.string().min(1).max(100),
    tyre_type: Joi.string().min(1).max(100),
    tank_capacity: Joi.number().integer().required(),
    front_brake_type: Joi.string().min(1).max(100),
    rear_brake_type: Joi.string().min(1).max(100),
    cooling_system: Joi.string().min(1).max(100),
    starting: Joi.string().min(1).max(100),
    drive_type: Joi.string().min(1).max(100),
    console: Joi.string().min(1).max(100),
    kerb_weight: Joi.string().min(1).max(100),
    comments: Joi.string().min(1).max(100),
    updated: Joi.date()
    };
  
    return Joi.validate(modal, schema);
  }
module.exports.Modals = Modals;
module.exports.validate = modalsValidate;