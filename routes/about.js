var express = require('express');
var router = express.Router();

/* Affiche la view contact */
router.get('/', function(req, res, next) {
    res.render('about', { title: 'Convertisseur' });
});

module.exports = router;