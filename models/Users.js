const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName:{
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
    verify:{
        type:Boolean,
        default:false
    },
    resetPassword:{
        type:String
    },
    resetDate:{
        type:Date
    },
    refreshToken:{
        type:String
    },
    createAt:{
        type:Date,
        default:Date.now
    },
    updateAt:{
        type:Date
    }
})
module.exports =mongoose.model('User',userSchema);
