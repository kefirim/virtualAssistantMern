import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import authRouter from "./routers/auth.routes.js"
import userRouter from "./routers/user.routes.js"
import cors from "cors"
import cookieParser from "cookie-parser"

dotenv.config()
const app = express()
const port = process.env.PORT || 5000

app.use(cookieParser())
app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, 
}))



app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)

const startServer = async () => {
  try {
    await connectDb()
    console.log("✅ Connected to MongoDB")

    app.listen(port, () => {
      console.log(`✅ Server started on port ${port}`)
    })
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB", error)
    process.exit(1)  // arrête le serveur si pas connecté
  }
}

startServer()
