import mongoose from 'mongoose';

const dbConnect = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then(console.log('db connected'))
    .catch((err) => {
      console.log(err)
    })
}

export default dbConnect;
