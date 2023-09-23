import Joi from "joi";

const productSchema = Joi.object().keys({
  product_name: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  coupon_code: Joi.string(),
});

export default productSchema;
