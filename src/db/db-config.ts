import mongoose from 'mongoose';

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI!, { dbName: 'next-todos' });

    const connection = mongoose.connection;
    connection.on('connected', () => {
      console.log('MongoDB connected successfully');
    });
    connection.on('error', (err) => {
      console.log('Mongo DB connection Error ' + err);
    });
  } catch (error) {
    console.log('Mongo: something goes wrong');
    console.log(error);
  }
}
