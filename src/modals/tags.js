import { Schema, models, model } from 'mongoose';

const TagSchema = new Schema({
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
      }
});

const Tags = models.tags || model('tags', TagSchema);

export default Tags;
