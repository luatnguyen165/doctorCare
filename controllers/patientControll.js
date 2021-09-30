const patient = require("../models/patient");

module.exports ={
    getPatiens: async function(req, res, next) {
        try {
            const PatientList = await patient.find();
            PatientList? res.status(200).json({
                PatientList
            }):res.status(404).json({message:'xảy ra lỗi'});
        }catch(err) {
            throw new Error(e)
        }
    },
    getIDPatient: async function(req, res, next) {
        try {
            const id = req.params.id;
            
            const PatientList = await patient.findById(id);
     
            PatientList? res.status(200).json({
                patient:PatientList
            }):res.status(404).json({message:`${id} không tôn tại `});
        }catch(err) {
            throw new Error(err)
        }
    },
    postPatient: async function(req, res, next) {
        try {
            const { fullname, sex, image, email, address, phone, birthday,createAt,updateAt} = req.body;
            const item= new patient({
                fullname,
                sex,
                image,
                email,
                address,
                phone,
                birthday,
                createAt,
                updateAt
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
    putPatient: async function(req, res, next) {
        try {
            const id = req.params.id;
            const PatientList = await patient.findById(id);
            console.log(PatientList);
            if(PatientList===null){
                res.status(404).json({message:`${id} không tồn tại`})
            }
            const {fullname,sex, image, email, address, phone, birthday,createAt,updateAt} = req.body;
            const item= await  patient.findByIdAndUpdate(req.params.id,{
                fullname,
                sex,
                image,
                email,
                address,
                phone,
                birthday,
                createAt,
                updateAt
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
    deletePatient: async function(req, res, next) {
        try {
            const id = req.params.id;
            const PatientList = await patient.findById(id);
            console.log(PatientList);
            if(PatientList===null){
                res.status(404).json({message:`${id} không tồn tại`})
            }
            await patient.findOneAndDelete(req.params.id).then(resp=>res.status(200).json({message:"Xóa Thành Công"})).catch(error=>res.status(404).json({message:"xóa thất bại"}))
        } catch (error) {
            res.status(200).json({message:"Xóa Thất bại"})
        }
    }
}