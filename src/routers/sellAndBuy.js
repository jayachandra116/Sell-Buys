const express = require("express");
const SellBuy = require("../mongoose/models/sellBuy");

const sellAndBuyRouter = new express.Router();

sellAndBuyRouter.get("/sellProduct", async (req, res) => {
  if (req.query.product) {
    try {
      const products = await SellBuy.find({ productName: req.query.product });
      return res.send(products);
    } catch (e) {
      return res.status(404).send(e);
    }
  }
  if (req.query.sortBy) {
    try {
      let sortedProducts;
      switch (req.query.sortBy) {
        case "lowerCostPrice":
          sortedProducts = await SellBuy.find().sort({ costPrice: 1 });
          return res.send(sortedProducts);
        case "higherCostPrice":
          sortedProducts = await SellBuy.find().sort({ costPrice: -1 });
          return res.send(sortedProducts);
        case "lowerSoldPrice":
          sortedProducts = await SellBuy.find().sort({ soldPrice: 1 });
          return res.send(sortedProducts);
        case "higherSoldPrice":
          sortedProducts = await SellBuy.find().sort({ soldPrice: -1 });
          return res.send(sortedProducts);
        default:
          defaultProducts=await SellBuy.find();
          return res.send(defaultProducts);
      }
    } catch (e) {
      res.status(400).send();
    }
  }
  try {
    let products = await SellBuy.find({});
    //console.log(products);
    if (!products) {
      res.status(400).send();
    }
    res.send(products);
  } catch (e) {
    res.status(400).send();
  }
});

//add new product
sellAndBuyRouter.post("/sellProduct", async (req, res) => {
  const product = new SellBuy(req.body);
  try {
    await product.save();
    if (!product) {
      return res.status(400).send();
    }
    res.status(201).send("Product Added");
  } catch (e) {
    if (e.errors.productName) {
      res.status(400).send(e.errors.productName.message);
    } else if (e.errors.costPrice) {
      res.status(400).send("cost price value cannot be zero or negative value");
    } else {
      res.status(400).send(e);
    }
  }
});

//update item
sellAndBuyRouter.patch("/sellProduct/:id", async (req, res) => {
  try {
    const product = await SellBuy.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(400).send();
    }
    res.send("Updated Successfully");
  } catch (e) {
    res.status(400);
    let message = "";
    if (e.errors) {
      if (e.errors.soldPrice) {
        message = "sold price value cannot be zero or negative value";
      }
      if (e.errors.costPrice) {
        message = "sold price value cannot be zero or negative value";
      }
      if (e.errors.productName) {
        message = e.errors.productName.message;
      }
    }
    res.send(message);
  }
});

//delete item
sellAndBuyRouter.delete("/sellProduct/:id",async (req,res)=>{
    try {
        const product=await SellBuy.findByIdAndDelete(req.params.id);
        if(!product){
          return res.status(400).send();
        }
        res.send("Deleted successfully");
    } catch (e) {
      res.status(400).send(e);
    }
})

module.exports = sellAndBuyRouter;
