const { urlencoded } = require('express');
const Joi = require('joi');
module.exports.listingSchema = Joi.object({
    listings : Joi.object({
        title: Joi.string().required(),
        description:Joi.string().required(),
        location:Joi.string().required(),
        country: Joi.string().required(),
        price :Joi.number().required().min(0),
        image:Joi.object({url:Joi.string().allow("",null)}),
        filter:Joi.string().required()
}).required()
});

module.exports.reviewSechema = Joi.object({
    review: Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required(),
    }).required()
})