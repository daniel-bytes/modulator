var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/sample', function(req, res) {
  request(req.query.path, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
    else {
      console.log(error);
    }
  });
});

module.exports = router;
