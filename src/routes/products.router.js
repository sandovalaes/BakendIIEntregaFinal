import {Router} from "express";
import {getProducts, getProduct} from "../controllers/product.controller.js"
import passport from "passport";

const productsRouter = Router();

productsRouter.get("/", passport.authenticate("jwt",{session: false}) , getProducts);
productsRouter.get('/:pid', passport.authenticate("jwt",{session: false}), getProduct);

export {productsRouter};