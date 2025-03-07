import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParse from "cookie-parser";
import connectDB from "./config/db.js";
import authRouter from './routes/authRoutes.js'
import userRouter from "./routes/userRoutes.js";
// import adminRoutes from './routes/adminRoutes.js';
//import authRoutes from "./routes/authRoutes.js";
import leaveRoutes from "./routes/leaveRequestRoutes.js";


const app = express();

const port = process.env.PORT || 5000;
connectDB();

const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173']


app.use(express.json())   //All requests will be passed using json
app.use(cookieParse());
app.use(cors({origin: allowedOrigins, credentials: true})) //So we can send the cookies in the response from express app

//API Endpoints
app.get('/', (req,res) =>res.send("Server is ready")); //route in an Express App. set up a route that listens for GET requets at '/' URL. 
app.use('/api/login', authRouter);
app.use('/api/user', userRouter);
app.use('/api/leave', leaveRoutes)

app.listen(port, () => console.log(`Server started on PORT:${port}`)); //wheneedver we start the backend the message 'server started on PORT' will be display in the terminal









