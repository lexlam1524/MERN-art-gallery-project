import express from "express";
import mongoose from "mongoose";
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';



const app = express();

app.use(express.json());



app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
    success:false,
    error:message,
    statusCode,
    });
});


mongoose.connect("mongodb+srv://lamkachun1524:hello@backenddb.kciiu3p.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB")
    .then(()=>{
        console.log('connected to mongoDB');
        app.listen(3000, () => {
            console.log("Server listening on port 3000");
          });   
    })
    .catch((err)=>{
        console.log(err);
});