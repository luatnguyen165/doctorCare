const doctorShedule = require("../models/doctorShedule")

module.exports ={
    getDoctorShedule: async function(req, res, next) {
        try {
            const SheduleList = await doctorShedule.find();
            SheduleList? res.status(200).json({
                SheduleList
            }):res.status(404).json({message:'xảy ra lỗi'});
        }catch(err) {
            throw new Error(e)
        }
    },
    getIDDoctorShedule: async function(req, res, next) {
        try {
            const id = req.params.id;
            
            const dSheduleList = await doctorShedule.findById(id);
     
            SheduleList? res.status(200).json({
                doctorShedule:SheduleList
            }):res.status(404).json({message:`${id} không tôn tại `});
        }catch(err) {
            throw new Error(err)
        }
    },
    postDoctorShedule: async function(req, res, next) {
        try {
            const {sheduleDate,sheduleDay,shedulmonth,createAt} = req.body;
            const item= new Degree({
                sheduleDate,
                sheduleDay,
                shedulmonth,
                createAt
            })
            console.log(item);
            const data =await item.save();
            console.log(data);
            data?res.status(200).json({message:'Thêm Thành Công'}):res.status(404).json({message:"Lỗi xảy ra"});
        }catch(err) {
            res.status(404).json({message:'Tên loại bằng cấp đã tồn tại '})
            // throw new Error(err)
        }
    },
    putDoctorShedule: async function(req, res, next) {
        try {
            const id = req.params.id;
            const degreeList = await Degree.findById(id);
            console.log(degreeList);
            if(degreeList===null){
                res.status(404).json({message:`${id} không tồn tại`})
            }
            const {degreeName,status} = req.body;
            const item= await  Degree.findByIdAndUpdate(req.params.id,{
                degreeName,
                status
            })
            console.log(item);
            const data =await item.save();
            console.log(data);
            data?res.status(200).json({message:'update Thành Công'}):res.status(404).json({message:"Cập nhật thất bại"});
        }catch(err) {
            res.status(404).json({message:'Tên loại bằng cấp đã tồn tại '})
            throw new Error(err)
        }
    },
    deleteDoctorShedule: async function(req, res, next) {
        try {
            const id = req.params.id;
            const SheduleList = await doctorShedule.findById(id);
            console.log(SheduleList);
            if(degreeList===null){
                res.status(404).json({message:`${id} không tồn tại`})
            }
            await doctorShedule.findOneAndDelete(req.params.id).then(resp=>res.status(200).json({message:"Xóa Thành Công"})).catch(error=>res.status(404).json({message:"xóa thất bại"}))
        } catch (error) {
            res.status(200).json({message:"Xóa Thất bại"})
        }
    }
}