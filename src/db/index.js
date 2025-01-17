import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);

        console.log("MongoDB Connection Successful: ", connectionInstance.connection.host);
        
    }
    catch(error){
        console.error("MongoDB Connection Error: ", error);
        process.exit(1);
    }
};
export default connectDB;