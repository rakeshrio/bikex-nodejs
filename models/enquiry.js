const mongoose = require('mongoose');
const Joi = require('joi');
const shortid = require('shortid');


const enquirySchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate
    },
    name:String,
    bike_name:String,
    mobile: Number,
    email: String,
    status:{type:Number, default:0},
    date: { type:Date, default:Date.now},
});
const Enquiry = mongoose.model('enquiry', enquirySchema)

function validateEnquiry(enquiry) {
    const schema = {
      name: Joi.string().min(1).max(50).required(),
      bike_name: Joi.string().min(1).max(50).required(),
      mobile: Joi.number().min(10).required(),
      email: Joi.string().min(5).max(100).required(),
    };
  
    return Joi.validate(enquiry, schema);
  }
module.exports.Enquiry = Enquiry;
module.exports.validate = validateEnquiry;