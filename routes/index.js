var express = require('express');
var router = express.Router();

/* Affiche la view principal */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Convertisseur' });
});

module.exports = router;
