const mongoose = require("mongoose")

const connect = ()=>{
    // mongoose.connect(process.env.MONGODB_URI)
    mongoose.connect("mongodb+srv://magma7094:FDYjFiAy6UKQc0Dh@cluster0.xxuyjjx.mongodb.net/")
    // mongoose.connect("mongodb://localhost:27017/VIPS")
    .then(()=>{
        console.log("database connected");
    })
    .catch((err)=>{
        console.log(err);
    })
}

module.exports = connect