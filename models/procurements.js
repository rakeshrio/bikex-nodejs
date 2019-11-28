const mongoose = require('mongoose');
const Joi = require('joi');

const procurementSchema = new mongoose.Schema({
    vehicle_id:Number,
    vehicle_number:String,
    model_id:Number,
    manufacture_year:Date,
    color:String,
    fines: Number,
    source: String,
    city: String,
    pincode: Number,
    state: String,
    address:String,
    rc_card: Boolean,
    insurance:Boolean,
    b_extract:Boolean,
    hypothecation:Boolean,
    documents: Array,
    regn_no:String,
    chassis_no:String,
    insurance_policy_number:String,
    rc_start:Date,
    rc_end:Date,
    insurance_start:Date,
    insurance_end:Date,
    status:{type:Number, default:0},
    imageUpload:{type:Number, default:0},
    remarks:String,
    procured_date: Date,
    procured_price: Number,
    selling_price: Number,
    transfer_date:Date,
    refurbishment_received:Date,
    refurbishment_done:Date,
    instock_date:Date,
    live_date:Date,
    sold_date:Date,
    delivered:Date,
    date: { type:Date, default:Date.now},
    updated: { type:Date, default:Date.now}
});
const Procured = mongoose.model('procured_list', procurementSchema)

function validateProcurement(procurement) {
    const schema = {
    vehicle_id:Joi.number(),
    vehicle_number: Joi.string().min(1).max(50).required(),
    model_id: Joi.number(),
    manufacture_year:Joi.required(),
    color: Joi.string().min(1).max(100),
    fines:Joi.number(),
    source: Joi.string().min(1).max(50).required(),
    city:Joi.string(),
    pincode: Joi.required(),
    state: Joi.string().min(1).max(100).required(),
    address: Joi.string().min(1).max(100),
    rc_card: Joi.boolean(),
    insurance:Joi.boolean(),
    b_extract:Joi.boolean(),
    hypothecation:Joi.boolean(),
    documents:Joi.string(),
    regn_no: Joi.string().min(1).max(100),
    chassis_no: Joi.string().min(1).max(100),
    insurance_policy_number: Joi.string().min(1).max(100),
    rc_start: Joi.required(),
    rc_end: Joi.required(),
    insurance_start: Joi.required(),
    insurance_end: Joi.required(),
    remarks:Joi.string(),
    procured_date: Joi.required(),
    procured_price: Joi.number().integer().required(),
    selling_price: Joi.number().integer().required(),
    transfer_date: Joi.date(),
    refurbishment_received: Joi.date(),
    refurbishment_done: Joi.date(),
    instock_date: Joi.date(),
    live_date: Joi.date(),
    sold_date: Joi.date(),
    delivered: Joi.date(),
    updated: Joi.date()
    };
  
    return Joi.validate(procurement, schema);
  }
module.exports.Procured = Procured;
module.exports.validate = validateProcurement;