import { Schema, models, model } from 'mongoose';

const productSchema = new Schema({
    productid: {
        type: String,
        required: true,
        unique: true
    },
    sellerid: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    maxprice: {
        type: Number
    },
    tags: {
        type: [String],
        required: true
    },
    thumbnail: {
        id: String,
        title: String,
        time: Date,
        url: String,
        thumb: String,
        delete_url: String,
        medium: String
      },
    product: {
        cid: String,
        mid: String,
        fileid: String,
        filename: String,
        downloadid: {
            type: String,
            required: true
        },
        },
    }
);

const Product = models.products || model('products', productSchema);

export default Product;
