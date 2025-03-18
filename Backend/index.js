import express from "express"
import dotenv from "dotenv"
import userRouter from "./routes/user.routes.js"
import connectDB from "./config/db.js";
import cors from "cors"
import streamRouter from "./routes/stream.routes.js";
import upvoteRouter from "./routes/upvote.routes.js";

dotenv.config();
const app = express()


app.use(cors({
  origin: '*', // Allows all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specifies allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specifies allowed headers
}));

app.use(express.json());

//Initialize Port Number
const PORT = process.env.PORT || 4000;

//Connect DB
connectDB()

//Routes
app.use('/api/user',userRouter)
app.use('/api/stream',streamRouter)
app.use('/api/upvote',upvoteRouter)

app.get('/',(req,res)=>{
    res.send('Hello World')
})

//Listining
app.listen(PORT, () => console.log(`Server is Started On ${PORT}`));

