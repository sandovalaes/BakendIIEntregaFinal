import { promises as fs } from 'fs';

class productsManager {
    static ultId = 0;

    constructor(path) {
        this.products = [];
        this.path = path;
    }

    //Métodos auxiliares 
    async leerArchivo() {
        const respuesta = await fs.readFile(this.path, "utf-8");
        const arrayProductos = JSON.parse(respuesta);
        return arrayProductos;
    }
    
    async guardarArchivo(arrayProductos) {
        await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
    }

    //Métodos: getProducts, getProducts, addProduct, updateProduct, deleteProduct 

    async getProducts() {
        try{
            const arrayProductos = await this.leerArchivo();
            return arrayProductos;
        }catch(error)
        {
            console.log("Error al obtener los productos."); 
            throw error; 
        }
    }

    async getProductById(id) {
        try{
            const arrayProductos = await this.leerArchivo();
            const buscado = arrayProductos.find(item => item.id === id);

            if (!buscado) {
                return "Producto no encontrado";
            } else {
                return buscado;
        }
        }catch(error)
        {
            console.log("Error al obtener el producto."); 
            throw error; 
        }
    }

    async addProduct({title, description, code, price, status, stock, category, thumbnail}) {

        try {
            const arrayProductos = await this.leerArchivo(); 

            if (!title || !description || !price || !code || !stock || !category) {
                console.log("Todos los campos son obligatorios");
                return;
            }
    
            if (arrayProductos.some(item => item.code === code)) {
                console.log("El codigo debe ser único.");
                return;
            }

            const nuevoProducto = {
                title,
                description,
                price,
                status,
                code,
                stock,
                category, 
                thumbnail
            }

            if(arrayProductos.length > 0) {
                productsManager.ultId = arrayProductos.reduce((maxId, product) => Math.max(maxId, product.id), 0); 
            }

            nuevoProducto.id = ++productsManager.ultId;
    
            arrayProductos.push(nuevoProducto);
    
            await this.guardarArchivo(arrayProductos);

            return "Producto Agregado.";

        } catch (error) {
            console.log("Error al agregar productos."); 
            throw error; 
        }
    }

    async updateProduct(updatedProduct, pid){
        try{
            this.products =  await this.leerArchivo();
            const result = this.products.find(product => product.id == pid);
    
            if (result){
                result.code  = updatedProduct.code? updatedProduct.code : result.code;
                result.title = updatedProduct.title? updatedProduct.title: result.title;
                result.description =  updatedProduct.description? updatedProduct.description : result.description;
                result.price = updatedProduct.price? updatedProduct.price : result.price;
                result.stock = updatedProduct.stock? updatedProduct.stock : result.stock;
                result.status = updatedProduct.status? updatedProduct.status : result.status;
                result.category = updatedProduct.category? updatedProduct.category : result.category;
                
                await this.guardarArchivo(this.products);
                return "Producto Actualizado.";
            }
            else
            {
                console.log("updateProduct: El producto a actualizar no existe!");
                return "El producto a actualizar no existe!";
            }
        }catch(error){
            console.error('updateProduct: Error durante la actualización del archivo',error)
            throw error;
        }
    }
    
    async deleteProduct(id)
    {
        try{
            this.products =  await this.leerArchivo();
            const findProduct = this.products.find(product => product.id == id)
            if (findProduct){
                const filteredProducts = this.products.filter(product => product.id != id);
                await this.guardarArchivo(filteredProducts);
                console.log("Producto Eliminado.");
                return "Producto Eliminado"
            }
            else{
                console.log("El Producto a eliminar no existe!");
                return "El producto a eliminar no existe!"
            }
        }catch(error){
            console.log("Error durante la eliminación del producto.");
            throw error;
        }    
    }
}

export {productsManager}; 
