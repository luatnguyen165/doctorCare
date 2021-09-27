const mongoose = require('mongoose');

const specialistSchema = mongoose.Schema({
    Name:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    phone:{
        type:String
    },
}