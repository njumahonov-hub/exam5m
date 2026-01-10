const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db.config")
const cookieParser = require("cookie-parser")
const authRoutes = require("./routes/auth.routes")
const errorMiddleware = require("./middleware/error.middleware")
const categoryroutes = require("./routes/category.routes")
const carRoutes = require("./routes/car.routes")
const usersecondRoutes = require("./routes/user.routes")
const savedrouter = require("./routes/saved.routes")
const adminRoutes = require("./routes/admin.routes")
require("dotenv").config()


const app = express()
app.use(cors({origin: true, credentials: true}))
app.use(express.json())
app.use(cookieParser())


connectDB()

app.use("/images", express.static("upload/images"))
app.use(authRoutes)
app.use(categoryroutes)
app.use(carRoutes)
app.use(usersecondRoutes)
app.use(savedrouter)
app.use(adminRoutes)

app.use(errorMiddleware)
PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("server is running at:", PORT);
    
})