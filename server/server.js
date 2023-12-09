import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import bookRoutes from './routes/bookRoutes.js'; 
import staffRoutes from './routes/staffRoutes.js';
// import branchRoutes from './routes/branchRoutes.js';
import managerRoutes from './routes/managerRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';

dotenv.config();

const app = express()

app.use(express.json())

app.use(cors())

// app.use("/api/libraries", libraryRoutes)
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})


mongoose.connect(process.env.MONG_URI)
.then(()=>{
app.listen(process.env.PORT, ()=>{
console.log(`listening on port ${process.env.PORT}`)
console.log("Connected to Database")
})})
.catch((error)=>{
    console.log(error)
})

//Make your API calls for every usecase here

app.use("/api/user", userRoutes);

app.use('/api/books', bookRoutes);

app.use('/api/staff', staffRoutes);

app.use('/api/managers', managerRoutes);

app.use('/api/services', serviceRoutes);
app.use('/api/feedbacks', feedbackRoutes);

app.use('/api/books/search', bookRoutes);


// app.get('/api/test', (req, res) => {
//     res.status(200).json({ message: 'this is test route' });
// });
