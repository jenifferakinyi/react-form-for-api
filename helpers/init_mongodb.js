const mongoose = require ('mongoose')

mongoose.connect(process.env.MONGODB_URI,{dbName:process.env.DB_NAME})
//promise
.then(()=>{
    console.log('connected to MongoDB');
})
.catch((err)=>console.log(err.message));