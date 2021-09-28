const mongoose = require('mongoose');

const specialistSchema = mongoose.Schema({
    specialName:{
        type:String
    },
    specialPrice:{
        type:String
    },
    createAt:{
        type:String
    },
    updateAt:{
        type:String
    },
})
module.exports = mongoose.model('specialist', specialistSchema);