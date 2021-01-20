// Controlador para o modelo batizado

var Batizado= require('../models/batizados')

// Devolve a lista de casamentos com data, titulo e ref.
module.exports.listar = () => {
    return Batizado
        .find({},{_id:1,date:1,title:1, ref:1})
        .sort()
        .exec()
}


// Devolve a informaçao de uma batizado
module.exports.consultar = id => {
    return Batizado
        .findOne({_id: id})
        .exec()
}


// Devolve um triplo com id, nome do pai e nome da mae
module.exports.progenitores = () => {
    return Batizado
    .find({},{_id:1,mae:1,pai:1})
    .sort()
    .exec()
}
//devolve a lista de batizados num dados ano
module.exports.listarAno = (ano) => {
    return Batizado
        .find({date: {$regex: ano}})
        .exec()
}

// Listar todos os batizados
module.exports.listarBatizados = (nome) =>{
    return Batizado
    .find({},{_id:0,nome:1})
    .exec()
}