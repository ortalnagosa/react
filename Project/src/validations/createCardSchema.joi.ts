import Joi from "joi";

export const cardSchema = Joi.object({
  title: Joi.string().required(),
  subtitle: Joi.string().required(),
  description: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email({ tlds: false }).required(),
  web: Joi.string().uri().required().allow(""),
  image: Joi.object({
    url: Joi.string(),
    alt: Joi.string(),
  }),
  address: Joi.object({
    state: Joi.string().allow(""),
    country: Joi.string().required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    houseNumber: Joi.number().required(),
    zip: Joi.number().allow(""),
  }),
});