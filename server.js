import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fileUpload from "express-fileupload";
import connectDB from "./config/mongodb.js";
import routes from "./routes/routes.js";
dotenv.config()
const app=express();
const PORT=5000
// const mongodb_url=process.env.MONGODB_URL
//middleware
app.use(cors({
  origin: 'https://primexstudio.lk',   
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true                   
}));


app.use(
  fileUpload({
    useTempFiles: false,
    
   
    limits: { fileSize: 40 * 1024 * 1024 }, // 10MB limit
    abortOnLimit:false,
  })
);
app.use(express.json())

app.listen(PORT,()=>{
    console.log("server is running on " + PORT)
})
connectDB();
app.use('/api',routes)
app.head("/ping", (req, res) => {
  res.status(200).json({ status: "OK"});
})
app.get("/ping", (req, res) => {
  res.status(200).json({ status: "OK" });
})


// console.log(process.env.EMAIL)
// console.log(process.env.PASSWORD)
