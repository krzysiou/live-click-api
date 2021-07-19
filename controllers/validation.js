const Joi = require('joi')

//REGISTER VALIDATION
const registerValidation = (data) => {
    const schema = Joi.object({
        userId: Joi.string(),
        email: Joi.string().min(6).required().email(),
        username: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    })
   return schema.validate(data)
} 

//LOGIN VALIDATION
const loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    })
   return schema.validate(data)
}

//NAME UPDATE VALIDATION
const usernameUpdateValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
    })
   return schema.validate(data)
} 

module.exports = { registerValidation, loginValidation, usernameUpdateValidation }