import express from "express"
import morgan from "morgan"

import studentRouter from "./routes/resultRoutes.js";

const app = express();

// Express Middlewares
app.use(morgan('dev'))

app.use(express.json())

app.use((req,res,next)=>{
    console.log("i am middleware")
    next();
})

//MiddleWare Routing
app.use("/api/results", studentRouter)

export default app;