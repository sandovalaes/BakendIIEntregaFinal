import mongoose from "mongoose";

const userCollection = "Users"

const userSchema = new mongoose.Schema(

    {
        first_name: { type: String, require: true, max:100},
        last_name: { type: String, require: true, max:100},    
        email: { type: String, require: true, unique: true, max:100}, 
        age: { type: Number, require: true},
        password: { type: String, require: true, max:200}, 
        cart: { type: mongoose.Schema.Types.ObjectId, ref: "Carts", default: null},
        role: { type: String, require: true, max:25, default: "user"}
    }
)

const userModel = mongoose.model(userCollection, userSchema)

export default userModel;