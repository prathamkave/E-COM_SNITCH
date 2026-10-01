import { Router } from "express";
import {
	createProductValidator,
	listProductValidator,
	unlistProductValidator,
} from "../validators/product.validators.js";
import {
	authenticate,
	authenticateSeller,
} from "../middlewares/auth.middleware.js";
import {
	createProduct,
	listallProducts,
	listProduct,
	unlistProduct,
	listAllProductsToSeller,
} from "../controller/product.controller.js";

import multer from "multer";

const upload = multer({
	storage: multer.memoryStorage(),
	limits: {
		files: 5,
		fileSize: 1 * 1024 * 1024,
	},
});

const router = Router();

router.post(
	"/",
	authenticate,
	authenticateSeller,
	upload.array("images"),
	(req, res, next) => {
		req.body.price = JSON.parse(req.body.price);
		req.body.sizes = JSON.parse(req.body.sizes);

		next();
	},
	createProductValidator,
	createProduct,
);

router.get("/", authenticate, listallProducts);

router.get(
	"/seller",
	authenticate,
	authenticateSeller,
	listAllProductsToSeller,
);

router.patch(
	"/unlist/:id",
	authenticate,
	authenticateSeller,
	unlistProductValidator,
	unlistProduct,
);

router.patch(
	"/list/:id",
	authenticate,
	authenticateSeller,
	listProductValidator,
	listProduct,
);

export default router;
