const mongoose = require('mongoose');
const Joi = require('joi');
const shortid = require('shortid');

const purchaseSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    customer_id:String,
    vehicle_id:Number,
    firstname:String,
    lastname:String,
    phone: Number,
    tefflon: Number,
    extended_w: Number,
    rsa: Number,
    comprehensive: Number,
    amount: Number,
    email: String,
    address1:String,
    address2:String,
    image:String,
    model:String,
    state:String,
    postalcode: Number,
    razorpay_order_id:String,
    razorpay_payment_id:String,
    razorpay_signature:String,
    payment_status:Number,
    date: { type:Date, default:Date.now},
});
const Purchase = mongoose.model('purchase', purchaseSchema)

function validatePurchase(purchase) {
    const schema = {
    customer_id:Joi.string().required(),
    vehicle_id:Joi.number().required(),
    firstname: Joi.string().min(1).max(50).required(),
    lastname: Joi.string().min(1).max(50).required(),
    phone: Joi.number().min(10).required(),
    tefflon: Joi.number().min(10),
    extended_w: Joi.number().min(10),
    rsa: Joi.number().min(10),
    comprehensive: Joi.number().min(10),
    amount: Joi.number().min(0).required(),
    email: Joi.string().min(5).max(100).required(),
    address1: Joi.string().min(5).max(100).required(),
    address2: Joi.string().min(5).max(100).required(),
    town: Joi.string().min(1).max(50).required(),
    state: Joi.string().min(1).max(50).required(),
    postalcode: Joi.number().required(),
    razorpay_order_id:Joi.string(),
    image:Joi.string(),
    model:Joi.string(),
    razorpay_payment_id:Joi.string(),
    razorpay_signature:Joi.string(),
    payment_status:Joi.number(),
    };
  
    return Joi.validate(purchase, schema);
  }
module.exports.Purchase = Purchase;
module.exports.validate = validatePurchase;