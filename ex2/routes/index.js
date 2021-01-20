var express = require('express');
var router = express.Router();
var axios = require("axios");
const { token } = require('morgan');

/* GET home page. */
router.get('/', function(req, res, next) {

   // Vai buscar o token para usar
    var token = req.app.get('token');

    console.log("TOKEN: " +  token)
    res.render('pagina_inicial')
    
})

/* GET /classes */
router.get('/classes', function(req, res, next) {
    var token = req.app.get('token');
    console.log("TOKEN:" + token)
    axios.get('http://clav-api.di.uminho.pt/v2/classes?estrutura=arvore&nivel=1&token=' + token)
    .then(data => {res.render('list', { lista : data.data})})
    .catch(err => res.render('error', {error: err}))
  })

  
// GEt /classe/:id
router.get('/classe/:id', function(req, res, next) {
  var token = req.app.get('token');
  
  axios.get('http://clav-api.di.uminho.pt/v2/classes/' + req.params.id + '?token=' + token )
  .then(data => {res.render('info_classe', { elem : data.data})})
  .catch(err => res.render('error', {error: err}))

});

// GEt /termosIndice
router.get('/termosIndice', function(req, res, next) {
  var token = req.app.get('token');
  
  axios.get('http://clav-api.di.uminho.pt/v2/termosIndice?token=' + token)
  .then(data => {res.render('lista_termos', {lista : data.data})})
  .catch(err => res.render('error', {error: err}))

});

module.exports = router;
