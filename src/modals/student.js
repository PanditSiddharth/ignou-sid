import { Schema, models, model } from 'mongoose';

const studentSchema = new Schema({
    studentid: {
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
        type: String
    },
    phone: {
        type: Number
    },
    state: {
        type: String
    },
    district: {
        type: String
    },
    address: {
        type: String
    },
    photo: {
        id: String,
        title: String,
        time: Date,
        url: String,
        thumb: String,
        delete_url: String,
        medium: String
    }
});

const Student = models.students || model('students', studentSchema);

export default Student;
