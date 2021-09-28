const mongoose = require('mongoose');
const doctorSchema = mongoose.Schema({
    doctorName:{
        type:String,
        required:true,
    },
    doctorSex:{
        type:String,
        required:true,
    },
    doctorBirdthday:{
        type:Date,
        required:true,
    },
    doctorYearStart:{
        type:Number,
        required:true,
    },
    doctorDescription:{
        type:String
    },
    degreeID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Degree'
    },
    specialID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'specialist'
    },
    createAt:{
        type:Date,
        default:Date.now
    },
    updateAt:{
        type:Date
    }

})
module.exports = mongoose.model('Doctor',doctorSchema)