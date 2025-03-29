import {Router} from "express";
import {cartManager} from "../app.js";

const cartsRouter = Router();

cartsRouter.get("/", async (req,res)=>{
    try{
        const misCarritos = await cartManager.getCarts();
        let limit = parseInt(req.query.limit);

        if (limit){
            res.status(200).send(misCarritos.slice(0,limit));
        }else{
            res.status(200).send(misCarritos);
        }
    }catch(error){
        console.log(error)
        res.status(500).send({message:'Error al consultar los carritos.'})
    }
})

cartsRouter.get("/:cid",async (req,res)=>{
    try{
        let id = req.params.cid;
        const carrito = await cartManager.getCart(id);
        return res.status(200).json(carrito);
    }catch(error){
        console.log(error);
        return res.status(500).send({message:"Error al consultar el carrito solicitado."});
    }
})

cartsRouter.post('/', async(req, res)=>{
    try{

        const newCart = req.body;
        const msg = await cartManager.addCart(newCart);
        res.status(200).send({message: `${msg}`});
    }catch(error){
        console.log(error)
        return res.status(500).send({message:'Error durante la creación del carrito.'})
    }
})

cartsRouter.post('/:cid/product/:pid', async(req, res)=>{
    try{
        const cid = req.params.cid;
        const pid = req.params.pid;
        const msg = await cartManager.addProductToCart(cid,pid);
        res.status(200).send({message: `${msg}`});
    }catch(error){
        console.log(error);
        return res.status(500).send({message:'Error, no se pudo agregar el producto al carrito.'});
    }
})

export {cartsRouter};