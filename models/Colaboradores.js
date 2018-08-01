const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ColaboradoresSchema = new Schema({
  Nombre:{
        type: String,
        required:true
  },
  UsuarioRed: {
    type: String,
    required:true
  },
  NombreConsultor: {
    type: String,
    required:true
  }
});

module.exports = mongoose.model("Colaboradores", ColaboradoresSchema);
