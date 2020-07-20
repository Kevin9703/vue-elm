var mysqlConf = require('../config/mysqlConfig')
var citySqlMap = require('../dao/citySqlMap')
var mysql = require('mysql')
var pool = mysql.createPool(mysqlConf);
module.exports = {
    insert: (city_name, callback) => {
        pool.getConnection((error, connetcion) => {
            if (error) throw error;
            connetcion.query(citySqlMap.add, city_name, function (error, result) {
                if (error) throw error;
                // console.log(result[0]);
                callback(result[0]);
                pool.releaseConnection(connetcion);
            });
        });
    },
    getInfo: (city_name, callback) => {
        pool.getConnection((error, connetcion) => {
            if (error) throw error;
            connetcion.query(citySqlMap.getAllCity, function (error, result) {
                if (error) throw error;
                // console.log(result[0]);
                callback(result);
                pool.releaseConnection(connetcion);
            });
        });
    },
    getCity: (city_name, callback) => {
        pool.getConnection((error, connetcion) => {
            if (error) throw error;
            const city = `%${city_name}%`
            connetcion.query(citySqlMap.searchCity, city, function (error, result) {
                // console.log(citySqlMap.searchCity)
                if (error) throw error;
                // console.log(result[0]);
                callback(result);
                pool.releaseConnection(connetcion);
            });
        });
    },
}