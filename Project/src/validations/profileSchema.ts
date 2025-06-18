import Joi from "joi";

export const updateProfileSchema = Joi.object({
  name: Joi.object({
    first: Joi.string().min(2).max(30).required(),
    middle: Joi.string().allow("").max(30),
    last: Joi.string().min(2).max(30).required(),
  }).required(),

  phone: Joi.string()
    .pattern(/^0[2-9]\d{7,8}$/)
    .required(),

    
  image: Joi.object({
    url: Joi.string().uri().allow(""),
    alt: Joi.string().allow(""),
  }).required(),

  address: Joi.object({
    state: Joi.string().min(2).required(),
    street: Joi.string().min(2).required(),
    houseNumber: Joi.number().required(),
    city: Joi.string().min(2).required(),
    country: Joi.string().min(2).required(),
    zip: Joi.number().required(),
  }).required(),
});
