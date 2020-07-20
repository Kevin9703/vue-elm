var express = require('express');
var router = express.Router();
var cityDAO = require('../../dao/cityDAO')

router.get('/', function (req, res, next) {
    city_name = req.query.city_name;
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>',city_name)
    cityDAO.insert(city_name, () => {
        res.json({
            code: 1,
            msg: '添加成功'
        })
    })

});

module.exports = router;