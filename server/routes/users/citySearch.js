var express = require('express');
var router = express.Router();
var cityDAO = require('../../dao/cityDAO')

router.get('/', function (req, res, next) {
    city_name = req.query.city_name;
    cityDAO.getCity(city_name, (cityInfo) => {
        res.json({
            cityInfo
        })
    })

});

module.exports = router;