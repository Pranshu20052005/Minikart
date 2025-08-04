const app = require("./src/app")
const connect = require("./src/db/db")

app.listen(3000, ()=>{
    console.log("server running on port no : ",3000);
    connect()
})