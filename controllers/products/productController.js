import { Product } from "../../models";
import multer from "multer";
import path from "path";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import Joi from "joi";
import fs from "fs";
import productSchema from "../../validators/productValidator";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    // 3746674586-123456789.png
    cb(null, uniqueName);
  },
});

const handleMultipartData = multer({
  storage,
  limits: { fileSize: 1000000 * 5 },
}).single("image"); // 5mb

const productController = {
  async store(req, res, next) {
    handleMultipartData(req, res, async (err) => {
      if (err) {
        return next(CustomErrorHandler.serverError(err.message));
      }
      const filePath = req.file.path;
      //   validation

      const { error } = productSchema.validate(req.body);
      if (error) {
        // Delete the uploaded file
        fs.unlink(`${appRoot}/${filePath}`, (err) => {
          if (err) {
            return next(CustomErrorHandler.serverError(err.message));
          }
        });

        return next(error);
        // rootfolder/uploads/filename.png
      }

      console.log(req.body);

      const { product_name, price, description, coupon_code, category } = req.body;
      let document;
      try {
        document = await Product.create({
          product_name,
          price,

          description,

          coupon_code,
          category,
          image: filePath,
        });
      } catch (err) {
        return next(err);
      }
      res.status(201).json(document);
    });
  },

  async update(req, res, next) {
    handleMultipartData(req, res, async (err) => {
      if (err) {
        return next(CustomErrorHandler.serverError(err.message));
      }
      let filePath;
      if (req.file) {
        filePath = req.file.path;
      }

      const productUpdateSchema = Joi.object().keys({
        product_name: Joi.string(),
        category: Joi.string(),
        price: Joi.number(),
        description: Joi.string(),
        coupon_code: Joi.string(),
      });
      // validation
      const { error } = productUpdateSchema.validate(req.body);
      if (error) {
        // Delete the uploaded file
        if (req.file) {
          fs.unlink(`${appRoot}/${filePath}`, (err) => {
            if (err) {
              return next(CustomErrorHandler.serverError(err.message));
            }
          });
        }

        return next(error);
        // rootfolder/uploads/filename.png
      }

      const { product_name, price, description, coupon_code, category } = req.body;
      let document;
      try {
        document = await Product.findOneAndUpdate(
          { _id: req.params.id },
          {
            product_name,
            price,

            description,

            coupon_code,
            category,
            ...(req.file && { image: filePath }),
          },
          { new: true }
        );
      } catch (err) {
        return next(err);
      }
      res.status(201).json(document);
    });
  },

  async delete(req, res, next) {
    const document = await Product.findOneAndDelete({ _id: req.params.id });

    if (!document) {
      return next(new Error("Nothing to delete"));
    }
    // image delete
    const imagePath = document._doc.image;
    // http://localhost:5000/uploads/1616444052539-425006577.png
    // approot/http://localhost:5000/uploads/1616444052539-425006577.png
    fs.unlink(`${appRoot}/${imagePath}`, (err) => {
      if (err) {
        return next(CustomErrorHandler.serverError());
      }
      return res.json({ success: true });
    });
  },

  async index(req, res, next) {
    let documents;
    // pagination mongoose-pagination
    try {
      documents = await Product.find().select("-updatedAt -__v").sort({ _id: -1 });
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }
    return res.json(documents);
  },
};

export default productController;
