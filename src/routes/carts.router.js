import {Router} from "express";
import {getCart, updateCart, deleteProductCart, addProductCart, deleteCart} from "../controllers/cart.controller.js"
import passport from "passport";

const cartsRouter = Router();

cartsRouter.get("/:cid", passport.authenticate("jwt",{session: false}), getCart);
cartsRouter.put("/:cid/products/:pid", passport.authenticate("jwt",{session: false}),updateCart);
cartsRouter.post('/:cid/products/:pid', passport.authenticate("jwt",{session: false}), addProductCart);
cartsRouter.delete('/:cid/products/:pid', passport.authenticate("jwt",{session: false}),deleteProductCart);
cartsRouter.delete('/:cid', passport.authenticate("jwt",{session: false}), deleteCart); 

export {cartsRouter};