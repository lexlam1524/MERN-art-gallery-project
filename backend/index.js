import express from "express";
import mongoose from "mongoose";
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import artistRoutes from './routes/artist.routes.js';
import artifactRoutes from './routes/artifact.routes.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';


dotenv.config();


mongoose.connect(process.env.MONGO)
    .then(()=>{
        console.log('connected to mongoDB');
        app.listen(3000, () => {
            console.log("Server listening on port 3000");
          });   
    })
    .catch((err)=>{
        console.log(err);
    });

const app = express();

app.use(express.json());
app.use(cookieParser());


app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/artifacts', artifactRoutes);

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
    success:false,
    error:message,
    statusCode,
    });
});

