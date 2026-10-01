import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { addToCartValidator } from "../validators/cart.validators.js";
import { addToCart, getCart } from "../controller/cart.controller.js";

const router = Router();

router.post("/", authenticate, addToCartValidator, addToCart);

router.get("/", authenticate, getCart);

export default router;
