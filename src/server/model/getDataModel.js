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
            console.log('result:', result);
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
        return JSON.stringify({
            'success': '1',
            'message' : '操作成功',
            'result': result
        });
    }
}
var sql = {
    deleteSql: 'DELETE FROM `ceshi` WHERE id=?' ,
}

var userModel = {
    addNewData :  function (name, value, res) {
        return new Promise(function (resovle, reject) {
            pool.getConnection(function(err, connection) {
                var  addRowDataStr = 'INSERT INTO `ceshi` (`name`,`value`)' +
                    ' VALUES (?, ?);'  ;
                connection.query(addRowDataStr, [name, value], function(err, result) {
                    // 以json形式，把操作结果返回给前台页面

                    resovle(jsonWrite(res, result));
                    // 释放连接
                    connection.release();
                });
            }) ;
        });
    },
    getData:  function (res) {
        return new Promise(function (resovle, reject) {
            pool.getConnection(function(err, connection) {
                var  addRowDataStr = 'SELECT * from `ceshi`' ;
                connection.query(addRowDataStr, [], function(err, result) {
                    console.log('result:', result);
                    // 以json形式，把操作结果返回给前台的页面是
                    resovle(jsonWrite(res, result));
                    // 释放连接
                    connection.release();
                });
            }) ;
        });
    },
    deleteData: function (req, res) {
        return new Promise(function (resovle, reject) {
            console.log('req:', req.query);
            var id = req.query.id;
            console.log('id:', id);
            optionTable(sql.deleteSql, [id], res, resovle);
        });
    }
}
/* GET home page. */


module.exports = userModel

