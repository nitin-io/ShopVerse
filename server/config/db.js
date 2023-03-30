import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_CONNECT_URL);
    console.log(
      `Succefully connected with database host: ${conn.connection.host}`
        .bgMagenta.white
    );
  } catch (error) {
    console.log(`MongoDB Connection Error: ${error}`.bgRed.white);
  }
};

export default connectDB;
