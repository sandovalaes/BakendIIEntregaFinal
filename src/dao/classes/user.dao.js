import userModel from "../models/user.model.js"

export default class User {

    getUser = async (email) =>{
        try{
            const result = await userModel.findOne({ email }).lean();
            return result;
        }catch{
            console.log("Error en getUser.");
            return null;
        }
    }

    createUser = async (user) => {
        try{
            const result = new userModel(user);
            return result;
        }catch{
            console.log("Error en createUser.");
            return null;
        }
    }
    
    updateUser = async (idUser,user) => {
        try{
            const result =  await userModel.updateOne({_id : idUser}, user)
            return result;
        }catch{
            console.log("Error en saveUser.");
            return null;
        }
    }

    saveUser = async (user) => {
        try{
            const result = user.save();
            return result;
        }catch{
            console.log("Error en saveUser.");
            return null;
        }
    }
}