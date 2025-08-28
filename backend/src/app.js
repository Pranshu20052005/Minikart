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


// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'https://minikart-1.onrender.com',
      'http://localhost:3000',
      'http://localhost:5173' // Vite default port
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json())
app.use(express.urlencoded({extended : true}))

console.log(process.env.MONGODB_URI);

app.use("/", indexRouter) 
app.use("/api/cart", cartRouter)
app.use("/api/users", userRouter)
app.use("/api/products", productRouter)


module.exports = app