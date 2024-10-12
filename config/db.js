import mongoose from 'mongoose';

const DB_URI = 'mongodb+srv://zmohamedkhalil9:STtRtthsVdPd5yLH@cluster0.i40eg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const dbConnect = () => {
  mongoose
    .connect(DB_URI)
    .then(console.log('db connected'))
    .catch((err) => {
      console.log(err)
    })
}

export default dbConnect;
