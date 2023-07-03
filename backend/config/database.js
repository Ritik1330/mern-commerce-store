const mongoose = require('mongoose');

const connectDatabase=( )=>{
    mongoose.connect(process.env.DB_URI,).then((data)=>{
        console.log(`moddb conected with server ${data.connection.host}`)
    })
    // handal unhandledRejection in server.js
    
    .catch((err)=>{
        console.log(`moguse ${err}`)
    })
}
module.exports = connectDatabase