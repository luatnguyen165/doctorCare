var mongoose = require('mongoose');
require('dotenv').config()
const connectDB = async()=>{
    try{
        // docker file
        await mongoose.connect(`${process.env.MONGOURL}`)
        console.log('Database connected')
    }catch(e){
        throw new Error(e)
    }
}
module.exports = connectDB;