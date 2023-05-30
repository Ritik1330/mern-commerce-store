const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

process.on("uncaughtException",(err)=>{
  console.log(`ERRor:- ${err.message}`)
  console.log(`server is shuting dawn due to uncaughtException `)
  process.exit(1)
})

// give the path of confing file 
dotenv.config({ path: "backend/config/config.env" });

//conecting to connectDatabase
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`server is working on http://localhost:${process.env.PORT}`);
});

// unhandledRejection Promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error:-${err.message}`);
  // console.log(`Error:-${err.stack}`);
  console.log('server is shuting dawn due to unhandledRejection');

  server.close(()=>{
    process.exit(1)
  })
});
