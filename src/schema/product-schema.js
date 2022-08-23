import Mongoose from '../../db.js'

const productSchema = new Mongoose.Schema (
    {
        name: String,
        desccription: String,
        price: Number,
        summary: String,
        stock: Number,
        fileName: String
    },
    {
        collection:'product',
        timestamps: true
    }
)

export default Mongoose.model('product', productSchema, 'product');