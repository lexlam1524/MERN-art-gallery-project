import express from "express";
import mongoose from "mongoose";

mongoose.connect("mongodb+srv://lamkachun1524:hello@backenddb.kciiu3p.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB")
    .then(()=>{
        console.log('connected to mongoDB');
    })
    .catch((err)=>{
        console.log(err);
    });
const app = express();

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
