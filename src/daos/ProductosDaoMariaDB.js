const ContenedorProductos = require('../contenedores/ContenedorProductos');
const options = require('../contenedores/options/mariaDB');

class ProductosDaoMariaDB extends ContenedorProductos {

    constructor() {
        super(options);
    }
}

module.exports =  ProductosDaoMariaDB;