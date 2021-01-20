const mongoose = require('mongoose')

var batizadoSchema = new mongoose.Schema({
    _id:String,
    date:String,
    title:String,
    ref:String,
    href:String,
    mae:String,
    pai:String,
    nome:String
  });

module.exports = mongoose.model('batizado', batizadoSchema)