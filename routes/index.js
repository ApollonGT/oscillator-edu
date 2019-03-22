var express = require('express');
var router = express.Router();

const show_plot = require('../src/charts');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/chart', function(req, res, next) {
    show_plot(req, res);
});

module.exports = router;
