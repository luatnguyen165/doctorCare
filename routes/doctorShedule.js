var express = require('express');
var{getDoctorShedule,getIDDoctorShedule, putDoctorShedule, postDoctorShedule, deleteDoctorShedule} = require('../controllers/doctorSheduleController');

var router = express.Router();
router.get('/',getDoctorShedule);
router.get('/lich-bac-si:id',getIDDoctorShedule);
router.post('/them-lich',postDoctorShedule);
router.put('/lich-bac-si:id',putDoctorShedule);
router.delete('/lich-bac-si:id',deleteDoctorShedule);
module.exports = router;
