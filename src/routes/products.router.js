import {Router} from "express";
import {getProducts, getProduct, addproduct, deleteproduct} from "../controllers/product.controller.js"
import passport from "passport";
import {handlePolicies} from "../config/authorizer.js";

const productsRouter = Router();

productsRouter.get('/addproduct', passport.authenticate("jwt",{session: false}), handlePolicies(["ADMIN"]), addproduct);
productsRouter.get('/deleteproduct', passport.authenticate("jwt",{session: false}), handlePolicies(["ADMIN"]), deleteproduct);
productsRouter.get("/", passport.authenticate("jwt",{session: false}) , getProducts);
productsRouter.get('/:pid', passport.authenticate("jwt",{session: false}), getProduct);

export {productsRouter};