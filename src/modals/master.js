import pkg from 'mongoose';
let { Schema, models, model } = pkg;

const MasterSchema = new Schema({
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

const Master = models.masters || model('masters', MasterSchema);

export default Master;