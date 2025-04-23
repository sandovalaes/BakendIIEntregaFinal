import {Router} from "express";
import cartModel from '../models/cart.model.js'
import passport from "passport";

const cartsRouter = Router();

cartsRouter.get("/:cid", passport.authenticate("jwt",{session: false}), async (req,res)=>{
    try{
        let idCart = req.params.cid
        const cart = await cartModel.findOne({_id : idCart}).populate("products.product").lean();
        if (!cart) return res.status(404).json({error: "Carrito no encontrado!"})
        console.log(cart.products)
        res.render('cart',{result :"success", payload: cart.products}) 
    }catch(error){
        return res.status(500).json({message:"Error al consultar el carrito solicitado."}) 
    }
})

cartsRouter.put('/:cid/products/:pid', async(req, res)=>{
    try{
        const idCart = req.params.cid
        const idProduct = req.params.pid
        const {quantity} = req.body
        const prueba = req.body;
        console.log("Actualizando Carrito")
        console.log(quantity)
        console.log(prueba)

        const cart = await cartModel.findOne({_id: idCart})

        if (!cart) 
            return res.status(404).json({ error: 'Carrito no encontrado' });

        let productIndex = cart.products.findIndex(item => String(item.product) === idProduct)

        if (productIndex === -1) 
            return res.status(404).json({ error: 'Producto no encontrado en el carrito' });

        cart.products[productIndex].quantity = quantity

        const msg = await cartModel.updateOne({_id : idCart}, cart)
        res.status(200).json({result :"success", payload: msg}) 
    }catch{
        return res.status(500).json({message:'Error durante la actualizacion del carrito.'})
    }
})


cartsRouter.delete('/:cid/products/:pid', async(req, res)=>{
    try{
        const idCart = req.params.cid
        const idProduct = req.params.pid
        const cart = await cartModel.findOne({_id: idCart})

        if (!cart) 
            return res.status(404).json({ error: 'Carrito no encontrado' });

        let productIndex = cart.products.findIndex(item => String(item.product) === idProduct)

        if (productIndex === -1) 
            return res.status(404).json({ error: 'Producto no encontrado en el carrito' });

        cart.products.splice(productIndex,1)
        let msg = await cartModel.updateOne({_id : idCart }, cart)
        res.status(200).json({result :"success", payload: msg})
        
    }catch(error){
        console.error('Error al eliminar el producto del carrito:', error);
        return res.status(500).json({ message: 'Error al eliminar el producto del carrito' });
    }
})


cartsRouter.delete('/:cid', async(req, res)=>{
    try{
        const idCart = req.params.cid
        const cart = await cartModel.findOne({_id: idCart})

        if (!cart) 
            return res.status(404).json({ error: 'Carrito no encontrado' });
        
        cart.products = [];
        let msg = await cartModel.updateOne({_id : idCart }, cart)
        
        res.status(200).json({result :"success", payload: msg})
        
    }catch(error){
        console.error('Error al vaciar el carrito', error);
        return res.status(500).json({ message: 'Error al vaciar el carrito' });
    }
})

cartsRouter.post('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;

        const cart = await cartModel.findById(cid);
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        const existingProductIndex = cart.products.findIndex(item => item.product.toString() === pid);
        if (existingProductIndex !== -1) {

            cart.products[existingProductIndex].quantity += 1;
        } else {

            cart.products.push({ product: pid, quantity: 1 });
        }

        await cart.save();

        return res.status(200).json({result :"success", payload: cart});
    } catch (error) {
        console.error('Error al agregar el producto al carrito:', error);
        return res.status(500).json({ error: 'Error al agregar el producto al carrito' });
    }
});

export {cartsRouter};