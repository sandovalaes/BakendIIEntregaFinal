import cartModel from "../models/cart.model.js"

export default class Cart {

    getCart = async (idCart) => {
        try{
            let result = await cartModel.findOne({_id : idCart}).populate("products.product").lean();
            return result;
        }catch{
            console.log("Error en getCart.");
            return null;
        }
    }

    updateCart = async (idCart, cart) => {
        try{
            const result = await cartModel.updateOne({_id : idCart}, cart)
            return result;
        }catch{
            console.log("Error en updateCart.");
            return null;
        }
    }

    saveCart = async (cart) => {
        try{
            const result = cart.save();
            return result;
        }catch{
            console.log("Error en saveCart.");
            return null;
        }
    }

    createCart = async (cart) => {
        try{
            const result = new cartModel({});
            console.log(result);
            return result;
        }catch{
            console.log("Error en createCart.");
            return null;
        }
    }
}