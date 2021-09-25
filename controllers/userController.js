const Users = require("../models/Users");
const nodemailer = require("nodemailer");

module.exports ={
    getListRegister: async function(req, res, next) {
        const userList = await Users.find();
        userList?res.send({message:'Thành công',userLists:userList}):res.status(404).json({error:'Danh sách user bị lỗi'});
    },
    getRegister: async function(req, res, next) {
        res.render('register')
    },
    postRegister: async function(req, res, next) {
        try{
            const { firstName,lastName,email,password,phone }=req.body;
            const user=new Users({firstName,lastName,email,password,phone});
            
            try{
                var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
                    from: 'Doctor Care',
                    to: email,
                    subject: 'Verify Account',
                    text: 'You recieved message from ' + email,
                    html: `<p>You have got a new message</b><ul><li>Username:' + lastName + firstName  + '</li><li>Email:' + email + '</li></ul></p> <a href="http://localhost:3000/verify/${token}">`
                }
                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                      user: testAccount.user, // generated ethereal user
                      pass: testAccount.pass, // generated ethereal password
                    },
                });

                
            }catch(e){
                throw new Error(e)
            }
            const item = await user.save();
            item?res.status(200).json({
                message:'Đăng ký thành công',
                userLists:item,

            }):res.status(404).json({error:'Đăng ký thất bại'});
        }catch(e){
            throw new Error(e)
        }
        
    }
}