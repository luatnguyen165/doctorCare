const mongoose = require('mongoose');

const specialistSchema = mongoose.Schema({
    specialName:{
        type:String,
        required:true,
    },
    specialPrice:{
        type:String,
        required:true,
    },
    createAt:{
        type:Date,
        default:Date.now
    },
    updateAt:{
        type:String
    },
})
module.exports = mongoose.model('specialist', specialistSchema);