var express = require('express');
const { getDoctor, getIdDoctor, postDoctor, deleteDoctor, putIdDoctor } = require('../controllers/doctorController');
var multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+file.originalname)
    }
    
  })
  const fileFilter = (req,file,cb) => {
    if(file.mimetype === "image/jpg"  || 
       file.mimetype ==="image/jpeg"  || 
       file.mimetype ===  "image/png"){
     
    cb(null, true);
   }else{
      cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false);
}
}
var upload = multer({ storage: storage,fileFilter:fileFilter })
var router = express.Router();

/* GET home page. */
router.get('/',getDoctor);
router.get('/bac-si/:id',getIdDoctor);
router.post('/them-bac-si',upload.single('doctorImage'),postDoctor)
router.put('/bac-si/:id',upload.single('doctorImage'),putIdDoctor)
router.delete('/bac-si/:id',deleteDoctor)
module.exports = router;
