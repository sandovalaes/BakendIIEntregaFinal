import Router from "express";
import {productManager} from "../app.js";

const productsRouter = Router();

//Realizamos ejemplo con el limit:
productsRouter.get("/", async (req, res) => {
    let limit = req.query.limit;
    try {
        const arrayProductos = await productManager.getProducts();

        if (limit) {
            res.status(200).send(arrayProductos.slice(0, limit));
        } else {
            res.status(200).send(arrayProductos);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Error interno del servidor."});
    }
})

productsRouter.get("/:pid", async (req, res) => {
    try{
        let pid = req.params.pid;
        const producto = await productManager.getProductById(parseInt(pid));
    
        if (!producto) {
            res.status(200).send({message: "No se encuentra el producto consultado."});
        } else {
            res.status(200).send({ producto });
        }
    }catch(error)
    {
        console.log(error);
        res.status(500).send({message: "Error interno del servidor."});
    }
})

productsRouter.post("/", async (req, res) => {
    const nuevoProducto = req.body;
    try {
        await productManager.addProduct(nuevoProducto);
        res.status(201).send({ message: "Producto agregado exitosamente" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
})

productsRouter.put('/:pid', async(req, res)=>{
    try{
        const pid = req.params.pid
        const productUpdated = req.body
        await productManager.updateProduct(productUpdated, pid)
        res.status(201).send({ message: "Producto actualizado exitosamente." });
    }catch{
        console.log(error);
        return res.status(500).send({message: 'Error durante la actualización del producto.'});
    }
})

productsRouter.delete('/:pid', async(req, res)=>{
    try{
        const pid = req.params.pid;
        const msg = await productManager.deleteProduct(pid);
        res.status(200).send({ message: `${msg}` });
    }catch(error){
        console.log(error);
        return res.send({message: 'Error durante la eliminación del producto.'});
    }
})

export {productsRouter};