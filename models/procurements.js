const mongoose = require('mongoose');
const Joi = require('joi');

const procurementSchema = new mongoose.Schema({
    vehicle_id:Number,
    vehicle_number:String,
    model_id:{type:Number, ref: 'modals'},
    type:String,
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
    noc:Boolean,
    form_26:{type:Boolean, default:false},
    form_28:{type:Boolean, default:false},
    form_29:{type:Boolean, default:false},
    form_30:{type:Boolean, default:false},
    form_34:{type:Boolean, default:false},
    form_35:{type:Boolean, default:false},
    form_36:{type:Boolean, default:false},
    documents: Array,
    regn_no:String,
    chassis_no:String,
    rc_start:Date,
    rc_end:Date,
    insurance_start:Date,
    insurance_end:Date,
    doc_status:{type:Number, default:0},
    status:{type:Number, default:0},
    imageUpload:{type:Number, default:0},
    remarks:String,
    insurance_policy_number:String,
    procured_date: Date,
    procured_price: Number,
    registration_cost: {type:Number, default:6000},
    km_reading: {type:Number, default:100},
    selling_price: Number,
    transfer_date:Date,
    refurbishment_received:Date,
    refurbishment_done:Date,
    instock_date:Date,
    live_date:Date,
    booked_date:Date,
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
    type: Joi.string().required(),
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
    noc:Joi.boolean(),
    form_26:Joi.boolean(),
    form_28:Joi.boolean(),
    form_29:Joi.boolean(),
    form_30:Joi.boolean(),
    form_34:Joi.boolean(),
    form_35:Joi.boolean(),
    form_36:Joi.boolean(),
    documents:Joi.string(),
    regn_no: Joi.string().min(1).max(100),
    chassis_no: Joi.string().min(1).max(100),
    insurance_policy_number: Joi.string().min(1).max(100),
    rc_start: Joi.date(),
    rc_end: Joi.date(),
    insurance_start: Joi.date(),
    insurance_end: Joi.date(),
    remarks:Joi.string(),
    procured_date: Joi.required(),
    registration_cost: Joi.number().integer().required(),
    km_reading:Joi.number().integer().required(),
    procured_price: Joi.number().integer().required(),
    selling_price: Joi.number().integer().required(),
    transfer_date: Joi.date(),
    refurbishment_received: Joi.date(),
    refurbishment_done: Joi.date(),
    instock_date: Joi.date(),
    live_date: Joi.date(),
    sold_date: Joi.date(),
    booked_date: Joi.date(),
    delivered: Joi.date(),
    updated: Joi.date()
    };
  
    return Joi.validate(procurement, schema);
  }
module.exports.Procured = Procured;
module.exports.validate = validateProcurement;