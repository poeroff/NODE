const express = require("express");




const app = express();
app.use(express.json());

const connect =  require("./schemas")

const goodsrouter = require("./routes/goods")
const cartrouter = require("./routes/cart")


app.use("/api",[goodsrouter,cartrouter])

connect()

app.listen(3000)