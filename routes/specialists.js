var express = require('express');
const{getSpecial, postSpecial, getIdSpecial, putIdSpecial, deleteIdSpecial}=require('../controllers/specialistsController');

var router = express.Router();
router.get('/',getSpecial);
router.post('/them-luong-bac-si:id',postSpecial);
router.get('/luong:id',getIdSpecial);
router.put('/luong:id',putIdSpecial);
router.delete('/luong:id',deleteIdSpecial);

module.exports = router;