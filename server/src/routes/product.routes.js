import { Router } from "express";
import { createProductValidator } from "../validators/product.validator.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { createProduct } from "../controller/product.controller.js";

import multer from "multer";

const upload = multer({
	storage: multer.memoryStorage(),
	limits: { 
        files: 5, 
        fileSize: 1 * 1024 * 1024
    },
});

const router = Router();

router.post(
	"/",
	authenticate,
	(req, res, next) => {
		if (req.user.role !== "seller") {
			return res.status(403).json({
				message: "User is not authorize to create product",
			});
		}
		next();
	},
	upload.array("images"),
	(req, res, next) => {
		req.body.price = JSON.parse(req.body.price);
		req.body.sizes = JSON.parse(req.body.sizes);

		next();
	},
    createProductValidator,
	createProduct,
);

export default router;
