import Order from "../models/Order.js";
import Joi from "joi";
const orderController = {
  async order(req, res, next) {
    const orderSchema = Joi.object().keys({
      address: Joi.string().required(),
      contactNumber: Joi.number().required(),
      customer_name: Joi.string().required(),
      customer_email: Joi.string().required(),
      order_name: Joi.string().required(),
      delivery_status: Joi.string(),
      order_qty: Joi.string().required(),
      order_price: Joi.number().required(),
    });
    let success = false;
    const { error } = orderSchema.validate(req.body);

    if (error) {
      return next(error);
    }
    const { address, delivery_status, contactNumber, customer_name, customer_email, order_name, order_qty, order_price } = req.body;
    let document;
    try {
      document = await Order.create({
        address,
        contactNumber,
        customer_name,
        customer_email,
        order_name,
        delivery_status,
        order_qty,
        order_price,
      });
    } catch (err) {
      return next(err);
    }
    success = true;
    res.status(201).json({ success, document });
  },
  async index(req, res, next) {
    let documents;
    // pagination mongoose-pagination
    try {
      documents = await Order.find().select("-updatedAt -__v").sort({ _id: -1 });
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }
    return res.json(documents);
  },
  async update(req, res, next) {
    const OrderUpdateSchema = Joi.object().keys({
      address: Joi.string(),
      contactNumber: Joi.number(),
      customer_name: Joi.string(),
      customer_email: Joi.string(),
      order_name: Joi.string(),
      delivery_status: Joi.string(),
      order_qty: Joi.string(),
      order_price: Joi.number(),
    });
    let success = false;
    // validation
    const { error } = OrderUpdateSchema.validate(req.body);
    console.log(req.body);
    if (error) {
      return next(error);
    }
    const { address, delivery_status, contactNumber, customer_name, customer_email, order_name, order_qty, order_price } = req.body;
    let document;
    try {
      document = await Order.findOneAndUpdate(
        { _id: req.params.id },
        {
          address,
          delivery_status,
          contactNumber,
          customer_name,
          customer_email,
          order_name,
          order_qty,
          order_price,
        },
        { new: true }
      );
    } catch (err) {
      return next(err);
    }
    success = true;
    res.status(201).json({ success, document });
  },
};

export default orderController;
