const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
    Fullname:{
        type:String,
        required:true,
    },
    sex:{
        type: String,
        required:true,
    },
    image:{
        type:mongoose.Schema.Types.Mixed,
    },
    email:{
        type: String
    },
    address:{
        type: String
    },
    phone:{
        type: String
    },
    birthday:{
        type: Date
    },
    createAt:{
        type:Date,
        default:Date.now
    },
    updateAt:{
        type: String
    }
})



module.exports = mongoose.model('patient', patientSchema);