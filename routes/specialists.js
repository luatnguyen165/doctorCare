var express = require('express');
const{getSpecial, postSpecial, getIdSpecial, putIdSpecial, deleteIdSpecial}=require('../controllers/specialistsController');

var router = express.Router();
router.get('/',getSpecial);
router.post('/',postSpecial);
router.get('/:id',getIdSpecial);
router.put('/:id',putIdSpecial);
router.delete('/:id',deleteIdSpecial);

module.exports = router;