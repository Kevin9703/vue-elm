var mysqlConf = require('../config/mysqlConfig')
var userSqlMap = require('../dao/userSqlMap')
var mysql = require('mysql');
const { response } = require('express');
var pool = mysql.createPool(mysqlConf);
module.exports = {
    getByName: (userName, callback) => {
        pool.getConnection((error, connetcion) => {
            if (error) throw error;
            connetcion.query(userSqlMap.getByUserName, userName, (error, result) => {
                if (error) throw error;
                // console.log(result[0]);
                callback(result[0]);
                pool.releaseConnection(connetcion);
            });
        })
    },
    checkPass: (user, callback) => {
        pool.getConnection((error, connetcion) => {
            if (error) throw error;
            connetcion.query(userSqlMap.checkPassword, [user.name, user.password], function (error, result) {
                if (error) throw error;
                // console.log(result[0]);
                callback(result[0]);
                pool.releaseConnection(connetcion);
            });
        });
    },
    insert: (user, callback) => {
        pool.getConnection((error, connetcion) => {
            if (error) throw error;
            connetcion.query(userSqlMap.insertNewUser, [user.user_name, user.true_name, user.password, user.phone, user.sex, user.add_time], function (error, result) {
                if (error) throw error;
                // console.log(result[0]);
                callback(result[0]);
                pool.releaseConnection(connetcion);
            });
        });
    },
    update: (user, callback) => {
        pool.getConnection((error, connetcion) => {
            if (error) throw error;
            connetcion.query(userSqlMap.update, [user.username, user.password, user.id], function (error, result) {
                if (error) throw error;
                callback(result.affectedRows > 0);
                pool.releaseConnection(connetcion);
            });
        })
    },

    getAvatar:(id,callback)=>{
        pool.getConnection((error,connetcion)=>{
            if (error) throw error;
            connetcion.query(userSqlMap.getAvatarById, id, function (error, result) {
                if (error) throw error;
                // console.log(result[0]);
                callback(result[0]);
                pool.releaseConnection(connetcion);
            });
        })
    },
    updateAvatar:(user, callback)=>{
        pool.getConnection((error, connetcion) => {
            if(error) throw error;
            connetcion.query(userSqlMap.updateAvatar,[user.avatar,user.id], function(error,result){
                if(error) throw error;
                callback(result[0]);
                pool.releaseConnection(connetcion);
            })
        })
    },
};