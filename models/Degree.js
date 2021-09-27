const mongoose = require('mongoose');
const degreeSchema = mongoose.Schema({
    degreeName:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    status:{
        type:Boolean,
        default:false,
    },
    createAt:{
        type:Date,
        default:Date.now
    }
})
module.exports = mongoose.model('Degree', degreeSchema)