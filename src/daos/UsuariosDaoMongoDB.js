const ContenedorMongoDB = require('../contenedores/ContenedorMongoDB');
const UsuarioModel = require('../contenedores/mongooseModels/UsuarioModel');

class UsariosDaoMongoDB extends ContenedorMongoDB {

    constructor(isInitialized) {
        super(UsuarioModel, isInitialized);
    }
}

module.exports =  UsariosDaoMongoDB;