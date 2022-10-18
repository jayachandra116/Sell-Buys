# sellbuys
Project to manage sold and purchased products

Usage:-

Possible methods to be used:
1.GET
  path - /sellProduct
    Possible Params:
    default - Gets all products from the database
      a.product=<productName>
        Ex:- /sellProduct?product=laptop
      b.sortBy=<condition>
        [lowerCostPrice, higherCostPrice, lowerSoldPrice, higherSoldPrice]
        Ex:- /sellProduct?sortBy=lowerCostPrice
        
2.POST
  path - /sellProduct
    Add the product data in the request body

3.PATCH
  path - /sellProduct<Item_ID>
    Add the updated data in the request body

4.DELETE
  path - /sellProduct<Item_ID>
    Deletes the item from the database whose id is <Item_ID>
      
