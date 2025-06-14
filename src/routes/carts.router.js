import {Router} from "express";
import {getCart, updateCart, deleteProductCart, addProductCart, deleteCart} from "../controllers/cart.controller.js"
import passport from "passport";
import {handlePolicies} from "../config/authorizer.js";

const cartsRouter = Router();

cartsRouter.get("/:cid", passport.authenticate("jwt",{session: false}), handlePolicies(["USUARIO","ADMIN"]), getCart);
cartsRouter.put("/:cid/products/:pid", passport.authenticate("jwt",{session: false}),handlePolicies(["USUARIO"]),updateCart);
cartsRouter.post('/:cid/products/:pid', passport.authenticate("jwt",{session: false}), handlePolicies(["USUARIO"]) ,addProductCart);
cartsRouter.delete('/:cid/products/:pid', passport.authenticate("jwt",{session: false}), handlePolicies(["USUARIO"]), deleteProductCart);
cartsRouter.delete('/:cid', passport.authenticate("jwt",{session: false}), handlePolicies(["USUARIO"]) , deleteCart); 

export {cartsRouter};