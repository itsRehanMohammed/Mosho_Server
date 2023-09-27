import { instance } from "../server.js";
import { RAZORPAY_API_SECRET } from "../config";
import crypto from "crypto";
import Payment from "../models/Payment.js";
import Address from "../models/Address.js";
import Joi from "joi";
const paymentController = {
  async address(req, res, next) {
    const addressSchema = Joi.object().keys({
      name: Joi.string().required(),
      contactNumber: Joi.number().required(),
      locality: Joi.string().required(),
      city: Joi.string().required(),
      pincode: Joi.number().required(),
      landmark: Joi.string(),
    });
    const { error } = addressSchema.validate(req.body);

    if (error) {
      return next(error);
    }
    const { name, contactNumber, locality, city, pincode, landmark } = req.body;
    let document;
    try {
      document = await Address.create({
        name,
        contactNumber,
        locality,
        city,
        pincode,
        landmark,
      });
    } catch (err) {
      return next(err);
    }
    res.status(201).json(document);
  },
  async checkout(req, res, next) {
    try {
      const options = {
        amount: Number(req.body.amount * 100),
        currency: "INR",
      };

      const order = await instance.orders.create(options);
      res.json({
        success: true,
        order,
      });
    } catch (error) {
      return next(error);
    }
  },

  async paymentVerification(req, res, next) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto.createHmac("sha256", RAZORPAY_API_SECRET).update(body.toString()).digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;
    console.log(req.body);
    if (isAuthentic) {
      // Database comes here

      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
      res.redirect(`https://app.themosho.com/paymentsuccess?reference=${razorpay_payment_id}}`);
      // res.json({ success: true });
    } else {
      res.status(400).json({
        success: false,
      });
    }
  },
};

export default paymentController;
