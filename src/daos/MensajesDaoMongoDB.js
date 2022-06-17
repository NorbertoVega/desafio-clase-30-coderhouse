const ContenedorMongoDB = require('../contenedores/ContenedorMongoDB');
const MensajeModel = require('../contenedores/mongooseModels/MensajeModel');

class MensajesDaoMongoDB extends ContenedorMongoDB {

    constructor(isInitialized) {
        super(MensajeModel, isInitialized);
    }
}


module.exports = MensajesDaoMongoDB;