const app=require("./app");
require('./mongoose/connect_db/mongoose');

const port=8001;

app.listen(port,()=>{
  console.log("App is running on port "+port);
})