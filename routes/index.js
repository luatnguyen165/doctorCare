var express = require('express');
const { getRegister, postRegister,getListRegister,postVerify,getVerify,getResponse,cache,getResp } = require('../controllers/userController');
var router = express.Router();

/* GET home page. */
router.get('/',getRegister);
router.get('/list-register',getListRegister);
// router.get('/verify/:token',getVerify)
router.post('/respo',cache,getResponse);
router.get('/respo',getResp);
router.post('/verify/:token',postVerify);
router.post('/',postRegister);
module.exports = router;
