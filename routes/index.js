var express = require('express');
const { getRegister, postRegister,getListRegister } = require('../controllers/userController');
var router = express.Router();

/* GET home page. */
router.get('/',getRegister);
router.get('/list-register',getListRegister);
router.post('/',postRegister);
module.exports = router;
