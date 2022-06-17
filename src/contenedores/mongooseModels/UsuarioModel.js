const mongoose = require("mongoose");

const usuariosCollection = "usuarios";

const usuariosSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const UsuarioModel = mongoose.model(usuariosCollection, usuariosSchema);

module.exports = UsuarioModel;