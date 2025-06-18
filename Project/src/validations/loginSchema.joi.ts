import Joi from "joi"

export const loginSchema = Joi.object({

  email: Joi.string()
    .pattern(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
    .message('user "email" must be a valid email')
    .required(),

  password: Joi.string()
    .pattern(/((?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*-]).{7,20})/)
    .message(
      'user "password" must be 7-20 chars, with uppercase, lowercase, number and special char !@#$%^&*-',
    )
    .required(),

});
