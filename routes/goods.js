const express = require("express");

const router = express.Router();
const Goods = require("../schemas/good");
const Cart = require("../schemas/cart");


// /routes/goods.js
router.post("/goods", async (req, res) => {
	const { goodsId, name, thumbnailUrl, category, price } = req.body;

  const goods = await Goods.find({ goodsId });
  if (goods.length) {
    return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터입니다." });
  }

  const createdGoods = await Goods.create({ goodsId, name, thumbnailUrl, category, price });

  res.json({ goods: createdGoods });
});


router.post("/goods/:goodsId", async (req,res,next)=>{
  const {goodsId} = req.params;
  
  const {quantity}  = req.body
  

  const existsCarts = await Cart.find({goodsId: Number(goodsId)})

  
  if(existsCarts.length){
    return res.status(400).json({success:false, errorMessage:"이미 장바구니에 해당하는 상품이 존재합니다"})

  }
  console.log("asdsd")

  try{
    await Cart.create({ goodsId: Number(goodsId), quantity: quantity });
  res.json({result: "success"})

  }
  catch(err){
    console.log(err)
  }
})

router.put("/goods/:goodsId/cart",async(req,res,next)=>{
  const {goodsId} = req.params;
  const {quantity} =req.body;
  const existsCarts = await Cart.find({goodsId: Number(goodsId)});
  if(existsCarts.length){
    await Cart.updateOne({goodsId : Number(goodsId), $set : {quantity : quantity + 1}})

  }
  res.status(200).json({success : true})
})


router.delete("/goods/:goodsId/delete", async(req,res,next)=>{
  const {goodsId} = req.params;
 
  const existsCarts = await Cart.find({goodsId: Number(goodsId)});
  if(existsCarts){
    await Cart.deleteOne({goodsId})
  }
  res.json({result:"sucess"})

})



module.exports = router;

