import { Schema, models, model } from 'mongoose';

const sellerSchema = new Schema({
    sellerid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    about: {
        type: String,
        default: "I sell better content."
    },
    account: {
        type: String,
        required: true
    },
    ifsc: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    photo: {
        id: String,
        title: String,
        time: Date,
        url: String,
        thumb: String,
        delete_url: String,
        medium: String
      },
    verified: {
        type: Boolean,
        default: false
    },
    date: {
        type: String,
        default: new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata", "dateStyle": "medium"}),
        required: true
    },
    other: Schema.Types.Mixed
});

const Seller = models.sellers || model('sellers', sellerSchema);

export default Seller;
