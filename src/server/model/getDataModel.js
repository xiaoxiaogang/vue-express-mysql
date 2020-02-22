var express = require('express');
var router = express.Router();
var dbConfig = require("../config/db_config.json");

var mysql = require('mysql');

var pool = mysql.createPool({
    host : dbConfig.host,
    user : dbConfig.user,
    password : dbConfig.password,
    database : dbConfig.database
})
function optionTable (sql, params, res, resovle){
    pool.getConnection(function(err, connection) {
        connection.query(sql, params, function(err, result) {
            // 以json形式，把操作结果返回给前台页面
            resovle(jsonWrite(res, result));
            // 释放连接
            connection.release();
        });
    }) ;
}

function jsonWrite(res, result) {
    if (typeof result === 'undefined') {
        return JSON.stringify({
            'success': '0',
            'message' : '操作失败',
            'result': []
        });
    } else {
        console.log("typeof result:", typeof result)
      //  if(result.affectedRows === 1) {
            return JSON.stringify({
                'success': '1',
                'message' : '操作成功',
                'result': result
            });
      //  }
    }
}
var sql = {
    addDataSql: 'INSERT INTO `user_health_info` (`user_name`, `tel`, `health_status`, `department`, `address`, `work_status`, `longitude`) VALUES (?, ?, ?, ?, ?, ?, ?);',
    getDataSql: 'SELECT * from `user_health_info`',
    deleteSql: 'UPDATE  `user_health_info` SET `status`  = 2 WHERE id=?' ,
}

var userModel = {
    addNewData :  function (params, res) {
        return new Promise(function (resovle, reject) {
            pool.getConnection(function(err, connection) {
                console.log('err:', err);
                console.log('paramsparamsparamsparams:', params);
                //return;
                connection.query(sql.addDataSql,
                    [params.user_name,  params.tel,  params.health_status,  params.department,  params.address,  params.work_status,  params.longitude],
                    function(err, result) {
                        // 以json形式，把操作结果返回给前台页面
                        console.log('err:', err);
                        resovle(jsonWrite(res, []));
                        // 释放连接
                        connection.release();
                });
            }) ;
        });
    },
    getData:  function (req, res) {
        return new Promise(function (resovle, reject) {
            pool.getConnection(function(err, connection) {
                connection.query(sql.getDataSql, [], function(err, result) {
                    // 以json形式，把操作结果返回给前台的页面是
                    resovle(jsonWrite(res, result));
                    // 释放连接
                    connection.release();
                });
            }) ;
        });
    },
    deleteData: function (parms, res) {
        return new Promise(function (resovle, reject) {
            console.log('req:', parms.query);
            var id = parms.id;
            console.log('id:', id);
            optionTable(sql.deleteSql, [id], res, resovle);
        });
    }
}
/* GET home page. */


module.exports = userModel

