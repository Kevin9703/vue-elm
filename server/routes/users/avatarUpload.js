var express = require('express');
var router = express.Router();
var userDAO = require('../../dao/userDAO')
var fs = require('fs');
const { userInfo } = require('os');

router.post('/',function(req, res, next) {
    var user = {};
    const imgData = req.body.imgData;
    const imgName = req.body.imgName;
    user.avatar = imgName;
    user.id = req.body.id;
    console.log(imgName) // 把imgName存到数据库里
    var dataBuffer = Buffer.from(imgData, 'base64'); 
    fs.writeFile(process.cwd()+"/profile_photo/" + imgName , dataBuffer, function (err) {
        //用fs.write写入base64数据生成图片 此处需要手动创建img文件夹，否则会报错
        //预想把路径同时写入数据库，但表未设计好，待更新验证
            if (err) {
                res.send(err)
            } else {
                userDAO.updateAvatar(user,(userInfo)=>{
                    console.log(userInfo);
                })
                res.send('1')
            }
        })
});

module.exports = router;