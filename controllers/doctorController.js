const Doctor = require("../models/Doctor")


module.exports = {

    getDoctor: async function (req, res, next) {
        try {
            const doctorList = await Doctor.find();
            doctorList ? res.status(200).json(doctorList) : res.status(404).json({ message: 'That bai' })
        } catch (err) {
            throw new Error(err)
        }

    },
    postDoctor: async function (req, res, next) {
        try {
            const {
                doctorName,
                doctorSex,
                doctorBirdthday,
                doctorYearStart,
                doctorDescription,
                degreeID,
                specialID,

            } = req.body;
            const doctorImage = req.file.path;
            if (!doctorImage) {
                const error = new Error('Please choose files')
                error.httpStatusCode = 400
                return next(error)
            }

            const doctor = new Doctor(
                {
                    doctorName,
                    doctorImage,
                    doctorSex,
                    doctorBirdthday,
                    doctorYearStart,
                    doctorDescription,
                    degreeID,
                    specialID,

                }
            );
            await doctor.save();
            res.status(200).json({ message: 'Thêm Thành Công' })
        } catch (error) {

            res.status(404).json({ message: 'Thêm Thất bại' })
        }


    },
    putIdDoctor: async function (req, res, next) {

        const doctorList = await Doctor.findById(req.params.id);
        if (doctorList === null) {
            return res.status(404).json({ message: `${req.params.id} không tồn tại` })
        }
        try {
            const {
                doctorName,
                doctorSex,
                doctorBirdthday,
                doctorYearStart,
                doctorDescription,
                degreeID,
                specialID,

            } = req.body;
            const doctorImage = req.file.path;
            if (!doctorImage) {
                const error = new Error('Please choose files')
                error.httpStatusCode = 400
                return next(error)
            }

            const doctor = new Doctor(
                {
                    doctorName,
                    doctorImage,
                    doctorSex,
                    doctorBirdthday,
                    doctorYearStart,
                    doctorDescription,
                    degreeID,
                    specialID,

                }
            );
            await doctor.save();
            res.status(200).json({ message: 'Cập Nhật Thành Công' })
        } catch (error) {

            res.status(404).json({ message: 'Cập Nhật Thất bại' })
        }


    },
    getIdDoctor: async function (req, res, next) {
        try {
            const doctorList = await Doctor.findById(req.params.id);
            doctorList ? res.status(200).json(doctorList) : res.status(404).json({ message: 'That bai' })
        } catch (err) {
            throw new Error(err)
        }

    },
    deleteDoctor: async function (req, res, next) {
        try {
            const doctorList = await Doctor.findById(req.params.id);
            if (doctorList === null) {
                return res.status(404).json({ message: `${req.params.id} không tồn tại` })
            }
            await Doctor.findByIdAndDelete(req.params.id).then(resp => res.status(200).json({ message: 'Xóa thánh công' })).then(err => res.send('Xóa tHất bại'))
        } catch (error) {
            throw new Error(error)
        }
    }
}