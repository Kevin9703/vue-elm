var express = require('express');
var router = express.Router();
var result = require('../../model/result')
/* GET users listing. */
router.get('/',(req, res, next) => {
  if (req.session.username !== undefined) {
    console.log(`${req.session.username}退出登录`)
    req.session.destroy(() =>{
      res.json({
        code: 1,
        msg: '成功'
      });

      // req.session.loginUser = null;
    });
  } else { // 未登录返回403
    res.json(401,{
      code: 0,
      msg: '未登录'
    });
  }

});

module.exports = router;