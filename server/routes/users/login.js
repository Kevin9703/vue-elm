var express = require('express');
var router = express.Router();
var userDAO = require('../../dao/userDAO')

router.post('/', (req, res, next) => {
  userDAO.getByName(req.body.first_name, (userInfo) => {
    if (userInfo === undefined) {
      res.json({
        code: 0,
        msg: '用户名不存在'
      }) // 用户名不存在
    } else {
      var user = {};
      user.name = userInfo.user_name;
      user.password = req.body.last_name;
      userDAO.checkPass(user, (userInfo) => {
        if (userInfo === undefined) {
          res.json({
            code: 1,
            msg: '密码错误'
          }) // 密码错误
        } else {
          req.session.username = userInfo.user_name;
          console.log(`${req.session.username} 登录`)
          res.json({
            code: 2,
            msg: '登陆成功',
            id: userInfo.id,
            username: userInfo.user_name
          }) // 登陆成功，并设置cookie
        }
      });
    }
  })
});

module.exports = router;