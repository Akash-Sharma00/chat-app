import mongoose from "mongoose";

const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("DB is connected");
  } catch (error) {
    console.log(`Error connecting to db ${error}`);
  }
};

export default connectToMongo;
