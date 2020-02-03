const mongoose = require('mongoose');
const Joi = require('joi');

const bannersSchema = new mongoose.Schema({
    images:String,
    path: String,
    Date: { type:Date, default:Date.now},
    visibility: {type: Boolean, default: false}
});
const bikexbanners = mongoose.model('bikex_banners', bannersSchema)

function validatebanners(uploadcheck) {
    const schema = {
      images:Joi.string(),
      path:Joi.string(),
      visibility: Joi.boolean()
    };
  
    return Joi.validate(uploadcheck, schema);
  }
module.exports.Bikexbanners = bikexbanners;
module.exports.validate = validatebanners;