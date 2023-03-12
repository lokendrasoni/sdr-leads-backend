const Joi = require("joi");

exports.login = {
    body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    })
};

exports.register = {
    body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    })
};

exports.changePassword = {
    body: Joi.object({
        password: Joi.string().required(),
        current_password: Joi.string().required(),
        confirm_password: Joi.string().required()
    })
};