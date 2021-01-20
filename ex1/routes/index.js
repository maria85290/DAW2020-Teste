// Roteador do servidor API para o problema da gestão de Obras
var express = require('express');
var router = express.Router();
const Batismo = require('../controllers/batizados')



router.get('/api/batismos', function(req, res) {

  // Alinea (e)
  // GET /api/batismos?ano=YYYY 
  if (req.query.ano){
    let ano = req.query.ano
    console.log(ano)
    
     Batismo.listarAno(ano)
      .then(dados => res.status(200).jsonp(dados))
      .catch(e => res.status(500).jsonp({error: e}))
  }
  
 // Aline (a) - Devolve a lista dos batismos, com os campos: _id, date, title e ref;
 // GET /api/batismos  
  else {
    Batismo.listar()
      .then(dados => res.status(200).jsonp(dados))
      .catch(e => res.status(500).jsonp({error: e}))
  }

  })


// Alinea (d)
// GET /api/batismos/progenitores
router.get('/api/batismos/progenitores', function(req, res) {
  
  Batismo.progenitores()
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});


// A função limpa retira as ocorrencias de nomes de pessoas batizadas repetidas e ordena por ordem alfabetica
function limpa (dados){
  
  lista_sem_repetidos = []

  dados.forEach(e => {
      if (lista_sem_repetidos.indexOf(e.nome)==-1){
        lista_sem_repetidos.push(e.nome)
      }   
  });
  console.log(lista_sem_repetidos)
  return lista_sem_repetidos.sort()
}


// Alinea (c)
// Listar todos os individuos batizados (por ordem alfabetica)
// GET /api/batismos/batisado
router.get('/api/batismos/batisado', function(req, res) {
  Batismo.listarBatizados()
    .then(dados => res.status(200).jsonp(limpa(dados)))
    .catch(e => res.status(500).jsonp({error: e}))
});



// Alinea (b)  - Devolve a informação completa de um batismo;
//GET /api/batismos/:id 
router.get('/api/batismos/:id', function(req, res) {
  console.log(req.params.id)
  Batismo.consultar(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});



module.exports = router;
