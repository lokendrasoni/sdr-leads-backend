const Joi = require("joi");

exports.leads = {
    query: Joi.object({
        type: Joi.string().valid("", "all", "hot", "cold", "warm").optional(),
        page: Joi.number().default(1),
        limit: Joi.number().default(15),
        sortField: Joi.string().valid("", "name", "company", "sent", "opened", "responded").optional(),
        sortOrder: Joi.string().valid("", "asc", "desc").optional()
    })
};