const Degree = require("../models/Degree")

module.exports ={
    getDegree: async function(req, res, next) {
        try {
            const degreeList = await Degree.find();
            degreeList? res.status(200).json({
                degreeList
            }):res.status(404).json({message:'xảy ra lỗi'});
        }catch(err) {
            throw new Error(e)
        }
    },
    getIDDegree: async function(req, res, next) {
        try {
            const id = req.params.id;
            console.log(id);
            const degreeList = await Degree.findById(id);
            degreeList? res.status(200).json({
                degree:degreeList
            }):res.status(404).json({message:`${id} không tôn tại `});
        }catch(err) {
            throw new Error(err)
        }
    },
    postDegree: async function(req, res, next) {
        try {
            const {degreeName,status} = req.body;
            const item= new Degree({
                degreeName,
                status
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
    putDegree: async function(req, res, next) {
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
    deleteDegree: async function(req, res, next) {
        try {
            const id = req.params.id;
            const degreeList = await Degree.findById(id);
            console.log(degreeList);
            if(degreeList===null){
                res.status(404).json({message:`${id} không tồn tại`})
            }
            await Degree.findOneAndDelete(req.params.id).then(resp=>res.status(200).json({message:"Xóa Thành Công"})).catch(error=>res.status(404).json({message:"xóa thất bại"}))
        } catch (error) {
            res.status(200).json({message:"Xóa Thất bại"})
        }
    }
}