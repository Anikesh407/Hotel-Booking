import mongoose from "mongoose";
import 'dotenv/config';
const connectDB = async () => {
  try {

    mongoose.connection.on('connected', () => console.log("database Connected"));
    await mongoose.connect(`${process.env.DB_URL}`, { dbName: "Hotel-Booking-Data" }
    )

  } catch (error) {
    console.log(error.message);


  }
}

export default connectDB;