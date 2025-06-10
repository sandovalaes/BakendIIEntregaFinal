import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productCollection = "Products"

const productSchema = new mongoose.Schema(

    {
        title: { type: String, require: true, max:100},
        description: { type: String, require: true, max:100},
        price: { type: Number, require: true},
        status: { type: Boolean, require: true},
        code: { type: String, require: true, max:50},
        stock: { type: Number, require: true},
        category: { type: String, require: true, max:100},
        thumbnail: { type: String, require: true, max:2000},
    }
)

productSchema.plugin(mongoosePaginate)

const productModel = mongoose.model(productCollection, productSchema)

export default productModel;