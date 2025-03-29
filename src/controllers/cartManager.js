import { promises as fs } from 'fs';

class cartsManager{

    static lastId = 0;

    constructor(path){
        this.path = path;
        this.carts = [];
    }

    async readFile(){
        try{
            const data = await fs.readFile(this.path,'utf8');
            const arrayCarritos = data? JSON.parse(data) : [];
            console.log(arrayCarritos);
            return arrayCarritos;
        }catch(error){
            throw error;
        }
    }

    async getCarts(){
        try{
            return this.carts =  await this.readFile();
        }catch(error){
            console.error("getCarts: Error al listar los carritos",error);
            return []
        }
    }

    async getCart(id){
        try{
            this.carts =  await this.readFile();
            const carrito = this.carts.find(item=>item.id == id)
            if (!carrito)
                return "No existe el carrito solicitado"
            else
                return carrito
        }catch(error){
            console.error("getCart: Error al obtener el carrito",error);
            return []
        }
    }    

    async addProductToCart(cid,pid){
        try {

            this.carts =  await this.readFile();
            CartManager.lastId = this.carts.length;

            const myCart = this.carts.find(item=>item.id == cid)

            if (!myCart){
    
                return "El Carrito no existe";
            }
            else{
                const {id, products} = myCart
                const myproduct = products.find(item=>item.id == pid)
                if (!myproduct){
                    const newItemCart = {id:pid, quantity:1 }
                    myCart.products.push(newItemCart)
                }
                else{
                    myproduct.quantity++
                }
                await fs.writeFile(this.path, JSON.stringify(this.carts,null,2));
                return "Producto Agregado al Carrito.";
            }            
        }catch(error){
            console.log(error);
            throw error;
        }
    }
    
    async addCart(newItem){
        try {
            const {products} = newItem;

            const arrayCarritos =  await this.readFile();
            if (arrayCarritos.length > 0){
                CartManager.lastId = arrayCarritos.reduce((maxId, cart) => Math.max(maxId, cart.id), 0); 
            }

            const newCart = {
                id: ++CartManager.lastId,
                products
            }

            arrayCarritos.push(newCart);
            await fs.writeFile(this.path, JSON.stringify(arrayCarritos,null,2));
            return "Carrito creado.";
        }catch(error){
            console.log(error);
            throw error;
        }
    }
}

export {cartsManager};
