var express = require('express');
var router = express.Router();
var userDAO = require('../../dao/userDAO')

router.get('/',function (req,res) {
    console.log(req.query.userId);
    userDAO.getAvatar(req.query.userId,(userInfo)=>{
        console.log(userInfo)
        picture = userInfo.profile_photo;
        res.sendFile(process.cwd()+"/profile_photo/"+picture)//服务器该文件的绝对路径
    })
});

module.exports = router;