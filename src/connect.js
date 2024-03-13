import mongoose from 'mongoose';

// MongoDB connection URI
const mongoURI = process.env.URI;

let connect = async () => {
// Establishing connection with MongoDB
await mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

}

export default connect