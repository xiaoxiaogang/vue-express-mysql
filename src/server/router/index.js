import app from "../index";

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.send('respond with a resource:', req.questTimea);
  res.render('index', { title: 'Express' });
});

router.get('/test1', function (req, res) {
    console.log(' req.params.name:', req.params.name);
    console.log(' req.params.name:', JSON.stringify(req.params));
    res.send("hello express2歪歪11111");
});

module.exports = router;
