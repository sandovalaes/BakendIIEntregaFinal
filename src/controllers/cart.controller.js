import Cart from "../dao/classes/cart.dao.js";

const serviceCart = new Cart();

export const getCart = async (req,res)=>{
    try{
        let idCart = req.params.cid
        const cart = await serviceCart.getCart(idCart);
        if (!cart) return res.status(404).json({error: "Carrito no encontrado!"})
        console.log(cart.products)
        res.render('cart',{result :"success", cartId: idCart, payload: cart.products}) 
    }catch(error){
        return res.status(500).json({message:"Error al consultar el carrito solicitado."}) 
    }
}

export const updateCart = async (req,res)=>{
    try{
        const idCart = req.params.cid
        const idProduct = req.params.pid
        const {quantity} = req.body

        console.log(idProduct);

        const cart = await serviceCart.getCart(idCart);
        if (!cart) 
            return res.status(404).json({ error: 'Carrito no encontrado' });
        console.log(cart);

        let productIndex = cart.products.findIndex(item => String(item.product._id) === idProduct)
        if (productIndex === -1) 
            return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
        
        cart.products[productIndex].quantity = quantity;
        const msg = serviceCart.updateCart(idCart,cart);
        res.status(200).json({result :"success", payload: msg}) 
    }catch{
        return res.status(500).json({message:'Error durante la actualizacion del carrito.'})
    }
}

export const addProductCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cidCookie = req.cookies['EcommerceCart'];
        const cart = await serviceCart.getCart(cidCookie);

        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        const existingProductIndex = cart.products.findIndex(item => item.product.toString() === pid);
        if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].quantity += 1;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        await serviceCart.updateCart(cidCookie, cart);
        return res.status(200).json({result :"success", payload: cart});
    } catch (error) {
        console.error('Error al agregar el producto al carrito:', error);
        return res.status(500).json({ error: 'Error al agregar el producto al carrito' });
    }
}

export const deleteProductCart = async (req, res) =>{
        try{
            const idCart = req.params.cid
            const idProduct = req.params.pid
            const cart = await serviceCart.getCart(idCart);
            if (!cart) 
                return res.status(404).json({ error: 'Carrito no encontrado' });
    
            let productIndex = cart.products.findIndex(item => String(item.product._id) === idProduct)
            if (productIndex === -1) 
                return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
    
            cart.products.splice(productIndex,1)
            let msg = await serviceCart.updateCart(idCart,cart);
            res.status(200).json({result :"success", payload: msg})
            
        }catch(error){
            console.error('Error al eliminar el producto del carrito:', error);
            return res.status(500).json({ message: 'Error al eliminar el producto del carrito' });
        }
}

export const deleteCart = async (req, res)=>{
    try{
        const idCart = req.params.cid
        const cart = await serviceCart.getCart(idCart);
        if (!cart) 
            return res.status(404).json({ error: 'Carrito no encontrado' });
        
        cart.products = [];
        let msg = await serviceCart.updateCart(idCart, cart);
        res.status(200).json({result :"success", payload: msg})
        
    }catch(error){
        console.error('Error al vaciar el carrito', error);
        return res.status(500).json({ message: 'Error al vaciar el carrito' });
    }
}
