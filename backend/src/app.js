require("dotenv").config()
const express = require("express")
const productRouter = require("./routes/product.router")
const indexRouter = require("./routes/index.router")
const userRouter = require("./routes/user.router")
const cartRouter = require("./routes/cart.router")
const app = express()
const path = require("path")
const morgon = require("morgan")
const cors = require("cors")
app.use(morgon("dev"))


app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended : true}))

console.log(process.env.MONGODB_URI);

app.use("/", indexRouter) 
app.use("/api/cart", cartRouter)
app.use("/api/users", userRouter)
app.use("/api/products", productRouter)


module.exports = app