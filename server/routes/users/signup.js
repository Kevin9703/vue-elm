var express = require('express');
var router = express.Router();
var userDAO = require('../../dao/userDAO')

router.post('/', function (req, res, next) {
    var user = {};
    user.user_name = req.body.userName;
    user.true_name = req.body.trueName;
    user.password = req.body.password;
    user.phone = req.body.phone;
    user.sex = req.body.sex;
    user.add_time = req.body.add_time;
    // 查找用户名是否已存在
    userDAO.getByName(req.body.userName, (userInfo) => {
        if (userInfo === undefined) {
            userDAO.insert(user, () => {
                res.json({
                    code: 1,
                    msg: '注册成功'
                })
            })
        } else {
            res.json({
                code: 0,
                msg: '用户名已存在'
            })
        }
    })

});

module.exports = router;