const mongoose = require('mongoose');
const Joi = require('joi');


const ContactUsSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String
});

const ContactUs = mongoose.model('contactus', ContactUsSchema);

const contactUsValidationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    subject: Joi.string().required(),
    message: Joi.string().max(250).required(),
})


module.exports = {ContactUs, contactUsValidationSchema};
