const mongoose = require('mongoose');

const doctorSheduleSchema = mongoose.Schema({
    sheduleDate:{
        type: String,
        required:true
    },
    sheduleDay:{
        type: String,
        required:true
    },
    shedulmonth:{
        type: Number
    },
    createAt:{
        type:Date,
        default:Date.now
    }
})
module.exports = mongoose.model('doctorShedule', doctorSheduleSchema);