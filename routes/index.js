var express = require('express');
const {  postRegister,getListRegister,postVerify,getVerify,getResponse,cache,getResp } = require('../controllers/userController');

// check lại phần này * Nguyễn Văn Luật
// const { body } = require('express-validator');
// const validate = require('../common/common');

var router = express.Router();
/* GET home page. */
router.get('/',getListRegister);
// router.get('/verify/:token',getVerify)
router.post('/respo',cache,getResponse);
router.get('/respo',getResp);
router.post('/verify/:token',postVerify);
router.post('/',postRegister);
module.exports = router;
