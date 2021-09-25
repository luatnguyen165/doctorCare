const Users = require("../models/Users");
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const redisClient = require("../database/redis");
const fetch = require('node-fetch');
module.exports ={
    getListRegister: async function(req, res, next) {
        const userList = await Users.find();
        userList?res.send({message:'Thành công',userLists:userList}):res.status(404).json({error:'Danh sách user bị lỗi'});
    },
    //  sử dụng redis để tăng khả năng truy vấn dữ liệu
    getResp:  async function(req, res, next) {
        res.render('respo');
    },
    getResponse: async function(req, res, next) {
        try {
            console.log('Fetching data...');
            const username = req.body.username;
            const response = await fetch(`https://api.github.com/users/${username}`);
            const data = await response.json();
            const repos = data.public_repos;
            //send data to redis
            redisClient.SETEX(username, 60, repos);
            res.render('respo' ,{repos_result: repos});
        } catch (err){
            console.error(err);
            res.status(500);
        }
    },
    cache:  async function(req, res, next) {
        const username = req.body.username
        redisClient.get(username, (err, data) =>{
            console.log(data);
        if(err) {
            console.log('failed');
            throw err};

        if(data !== null){
            res.render('respo' ,{repos_result: data});

        }else{
            next();
        }
    })
    },
    // end redis cache
    getRegister: async function(req, res, next) {
        res.render('register')
    },
    // getVerify: async function(req, res, next) {
    //     const token = req.params.token;
    //     res.redirect(`/verify/${token}`)
    // },
    postVerify: async function(req, res, next) {
        const token = req.params.token;
        const user = await Users.find({tokenMail:token})
        if(user.length>0){
            const id = user[0]._id;
            const item =  await Users.findByIdAndUpdate(id,{
                verify:true,
                tokenMail:null
            })
            await item.save();
        }
        user.length>0?res.send('chứng thực token'):res.send('chứng thực failed');
    },

    postRegister: async function(req, res, next) {
        try{
            const { firstName,lastName,email,password,phone }=req.body;
            const token = jwt.sign({email:email},process.env.TOKENMAIL,{
                expiresIn:process.env.EXPRIREMAIL
            })
            const tokenMail=token;
            const user=new Users({firstName,lastName,email,password,phone,tokenMail});
            const item = await user.save();
            try{
                var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
                    from: 'Doctor Care',
                    to: email,
                    subject: 'Verify Account',
                    text: `You recieved message from ${email}`,
                    html: `<p>You have got a new message</b><ul><li>Username:' ${lastName}  ${firstName} '</li><li>Email:' ${email} + '</li></ul></p> <a href="http://localhost:3000/verify/${token}">Verify Account</a>`
                }
                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true, // true for 465, false for other ports
                    auth: {
                      user: process.env.USER_MAIL, // generated ethereal user
                      pass:process.env.PASS_MAIL, // generated ethereal password
                    },
                });
                transporter.sendMail(mainOptions, function(err, info){
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Message sent: ' +  info.response);
                    }
                });
            }catch(e){
                throw new Error(e)
            }
            
            item?res.status(200).json({
                message:'Đăng ký thành công',
                userLists:item,

            }):res.status(404).json({error:'Đăng ký thất bại'});
        }catch(e){
            throw new Error(e)
        }
        
    }
}