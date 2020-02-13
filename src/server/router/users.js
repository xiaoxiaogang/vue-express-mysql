var express = require('express');

var userModel = require("../model/freshModel.js");

var router = express.Router();
var app = express();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource:'+req.questTime);
});
router.get('/cc', function(req, res, next) {
    res.send('respond with a resourccccc:'+req.questTime);
});
router.get('/addData',  async function (req, res, next) {
    var random = Math.floor(Math.random()*100);
    var name = 'wangg'+random;
    var value = '1'+random;

    var ret = await userModel.addNewData(name, value, res);
    console.log('aaaaa===ret:', ret);
    res.send(ret);
});

router.get('/getAllData',  async function (req, res, next) {
    var ret = await userModel.getData(res);
    console.log('aaaaa===ret:', ret);
    res.send(ret);
});

router.get('/deleteData',  async function (req, res, next) {
    var ret = await userModel.deleteData(req, res);
    console.log('aaaaa===ret:', ret);
    res.send(ret);
});

module.exports = router;
