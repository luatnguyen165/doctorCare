const mongoose = require('mongoose');

const doctorSheduleSchema = mongoose.Schema({
    sheduleDate:{
        type:array,
        required:true,
    },
    sheduleDay:{
        type:array,
        required:true,
    },
    shedulmonth:{
        type: Number,
    },
    createAt:{
        type:Date,
        default:Date.now
    },
})
module.exports = mongoose.model('doctorShedule', doctorSheduleSchema);