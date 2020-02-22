var express = require('express');

var userModel = require("../model/getDataModel.js");

var router = express.Router();

var  aa =  JSON.stringify({
    'success': '1',
    'message' : '操作成功',
    'result': []
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource:'+req.questTime);
});
router.get('/addData',  async function (req, res, next) {
    console.log('reqd:', req.query);
  //  var ret = await userModel.addNewData(req.query,  res);
    //console.log('aaaaaqqq===ret:', ret);
   res.send(aa);
});

router.get('/getAllData',  async function (req, res, next) {
    var ret = await userModel.getData(req, res);
    console.log('aaaaa===ret:', ret);
    res.send(ret);
});

router.get('/deleteData',  async function (req, res, next) {
    var ret = await userModel.deleteData(req.query, res);
    console.log('aaaaa===ret:', ret);
    res.send(ret);
});

module.exports = router;
