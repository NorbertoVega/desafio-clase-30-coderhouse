const mongoose = require("mongoose");

const mensajesCollection = "mensajes";

const authorSchema = new mongoose.Schema({
    email: { type: String, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    edad: { type: Number, required: true },
    alias: { type: String, required: true },
    avatar: { type: String, required: true },
})

const mensajesSchema = new mongoose.Schema({
    author: { type: authorSchema, required: true },
    text: { type: String, required: true },
    time: { type: String, required: true }
});

const MensajeModel = mongoose.model(mensajesCollection, mensajesSchema);

module.exports = MensajeModel;
