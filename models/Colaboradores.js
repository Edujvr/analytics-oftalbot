const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ColaboradoresSchema = new Schema({
  userid:{
        type: String,
        required:true
  },
  consultor: {
    type: String,
    required:true
  }
});

module.exports = mongoose.model("Colaboradores", ColaboradoresSchema);
