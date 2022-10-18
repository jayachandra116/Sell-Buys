const mongoose=require("mongoose");
const URL='mongodb://localhost:27017/SellAndBuy'

mongoose.connect(URL,{
    useNewUrlParser:true,
})