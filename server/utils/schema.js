const Joi = require('joi');

const idSchema = {
    params: {
        id: Joi.string().required()
    }
};

const loginSchema = {
    body: {
        username: Joi.string().required(),
        password: Joi.string().required()
    }
};

module.exports = {
    idSchema,
    loginSchema
};
