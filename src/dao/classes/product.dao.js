import productModel from "../models/product.model.js"

export default class Product {

    getProducts = async (filter, options) =>{
        try{
            let result = await productModel.paginate( filter, options);
            return result;
        }catch{
            console.log("Error en getProducts.");
            return null;
        }
    }
    
    getProduct = async (pid) =>{
        try{
            let result = await productModel.findOne({_id : pid}).lean();
            return result;
        }catch{
            console.log("Error en getProduct.");
            return null;
        }
    }
}