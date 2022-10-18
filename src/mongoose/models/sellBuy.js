const mongoose=require('mongoose');

const sellBuySchema=new mongoose.Schema({
    productName:{
        type:String,
        required:true,
        validate(value){
            if(value.length <4){
                throw new Error("product name should have minimum of four characters");
            }
        }
        
    },
    costPrice:{
        type:Number,
        required:true,
        min:1
    },
    soldPrice:{
        type:Number,
        min:1
    }

})

const SellBuy=mongoose.model("SellBuy",sellBuySchema);
module.exports=SellBuy;