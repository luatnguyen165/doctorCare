var express = require('express');
const { getDegree,postDegree,getIDDegree,putDegree,deleteDegree} = require('../controllers/degreeController');
var router = express.Router();

/* GET home page. */
router.get('/',getDegree);
router.get('/bang-cap/:id',getIDDegree);
router.post('/them-bang-cap',postDegree)
router.put('/bang-cap/:id',putDegree)
router.delete('/bang-cap/:id',deleteDegree)
module.exports = router;
