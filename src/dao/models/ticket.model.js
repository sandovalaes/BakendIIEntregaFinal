import mongoose from "mongoose";

const ticketCollection = "Tickets"

const ticketSchema = new mongoose.Schema(
    {
        code: { type: String, require: true, unique: true, max:50},
        purchase_datetime: {type: Date, require: true},
        amount: { type: Number, require: true},
        purchaser: { type: String, require: true, max:100},
        products: { 
            type:   [
                        {
                            product:{type : mongoose.Schema.Types.ObjectId, ref: "Products"},
                            quantity: {type : Number, default:1}
                        }
                    ] ,
            default: []        
        }
    }
)

const ticketModel = mongoose.model(ticketCollection, ticketSchema)

export default ticketModel;