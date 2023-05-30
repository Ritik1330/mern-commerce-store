const express =require("express")
const app =express()
const cookieparser =require("cookie-parser")
const errorMiddleware = require ("./middleware/error")
app.use(express.json())

// for gate user cooke req.cookie.token
app.use(cookieparser())



//route import
const routeproduct =require("./routes/productRoutes")
const user =require("./routes/userRoutes")
const order =require("./routes/orderRoutes")
app.use("/api/v1",routeproduct)
app.use("/api/v1",user)
app.use("/api/v1",order)


//midelware for error
app.use(errorMiddleware)

module.exports = app 