var express = require('express');
var { getPatiens, getIDPatient, postPatient, putPatient, deletePatient }= require('../controllers/patientControll');

var router = express.Router();
router.get('/patient',getPatiens);
router.get('/patient:id',getIDPatient);
router.post('/patient',postPatient);
router.put('/patient:id',putPatient);
router.delete('/patient:id',deletePatient);
module.exports = router;
