const express = require("express");

const router = express.Router();
const Cart = require("../schemas/cart.js");
const Goods = require("../schemas/good.js")

router.get("/carts",async(req,res,next)=>{

    const carts = await Cart.find({});
    const goodsIds= carts.map((cart) => cart.goodsId);

    const goods = await Goods.find({goodsId: goodsIds})

    const results = carts.map((cart)=>{
        return {
            quantity : cart.quantity,
            goods : goods.find((item)=> item.goodsId === cart.goodsId)
        }
    })
    res.json({
        carts:results,
    })


})
module.exports = router