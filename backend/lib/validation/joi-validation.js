const Joi = require("joi");

const schemaUser = Joi.object({
    name: Joi.string().min(3).required().messages({
        'string.base': 'Name debe ser un string',
        'string.min': 'Name debe tener un minimo de 3 caracteres',
        'any.required': 'Name es requerido'
    }),
    color: Joi.string().valid("red", "green", "blue").required().messages({
        'string.base': 'Color debe ser un string',
        'any.only': 'Color solo puede ser "red", "green", "blue"',
        'any.required': 'Color es requerido'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Formato invalido de Email',
        'any.required': 'Email es requerido'
    }),
    lastName: Joi.string().required().messages({
        'string.base': 'lastName debe ser un string',
        'any.required': 'lastName es requerido'
    }),
    dni: Joi.string().required().messages({
        'string.base': 'dni debe ser un string',
        'any.required': 'dni es requerido'
    }),
    age: Joi.number().min(0).max(200).messages({
        'number.base': 'Age debe ser un numero',
        'number.min': 'Age no puede ser menor que 0',
        'number.max': 'Age no puede ser mayor que 200'
    })
});

const schemaUserNoRequire = Joi.object({
    name: Joi.string().min(3).messages({
        'string.base': 'Name debe ser un string',
        'string.min': 'Name debe tener un minimo de 3 caracteres',
    }),
    color: Joi.string().valid("red", "green", "blue").messages({
        'string.base': 'Color debe ser un string',
        'any.only': 'Color solo puede ser "red", "green", "blue"',
    }),
    email: Joi.string().email().messages({
        'string.email': 'Formato invalido de Email',
    }),
    lastName: Joi.string().messages({
        'string.base': 'lastName debe ser un string',
    }),
    dni: Joi.string().messages({
        'string.base': 'dni debe ser un string',
    }),
    age: Joi.number().min(0).max(200).messages({
        'number.base': 'Age debe ser un numero',
        'number.min': 'Age no puede ser menor que 0',
        'number.max': 'Age no puede ser mayor que 200'
    })
});

module.exports = {
    schemaUser,
    schemaUserNoRequire
};
