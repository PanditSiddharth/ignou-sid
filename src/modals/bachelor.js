import pkg from 'mongoose';
let { Schema, models, model } = pkg;

const BachelorSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
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
    sellerid: {
        type: String,
        default: "owner"
    }
});

const Bachelor = models.bachelors || model('bachelors', BachelorSchema);

export default Bachelor;