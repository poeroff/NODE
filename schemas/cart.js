const mongoose =require("mongoose");


const cartScheman = new mongoose.Schema({
    
        goodsId :{
            type : Number,
            required : true,
            
        },
        quantity : {
            type : Number,
            require : true
        }

    
})
module.exports = mongoose.model("Cart",cartScheman)