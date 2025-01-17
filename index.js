//require('dotenv').config({path:'./env'});
import dotenv from "dotenv";
import connectDB from "./src/db/index.js";




dotenv.config({path:'./env'});

connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.error("Express Error: ", error);
        throw error;
    });
    app.listen(process.env.PORT||8000,()=>{
        console.log("Server is running on port: ", process.env.PORT);
    });
})
.catch((error)=>{
    console.error("MongoDB Connection Failed: ", error);
    throw error;
});



// import express from "express";
// const app = express();
// ;(async()=>{
//     try{
//        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//        app.on("error", (error) => {
//         console.log("Error: ", error);
//         throw error;
//        });
//        app.listen(process.env.PORT, () => {
//         console.group("Server is running on port: ", process.env.PORT);
//        });
//     }
//     catch(error){
//         console.error("Error: ", error);
//         throw error;
//     }
// })