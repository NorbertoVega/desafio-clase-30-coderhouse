const knex = require('knex');

class ContenedorProductos {

    constructor(config) {
        this.config = config;
        this.knex = knex(config);
    }

    async createTable() {
        try {
            await this.knex.schema.createTable('productos', table => {
                table.increments('id');
                table.string('title');
                table.integer('price');
                table.string('thumbnail');
            });
            console.log('Tabla productos creada.');
        }
        catch (err) {
            console.log(err);
        }
    }

    async insertMockProducts(productList) {
        try {
            await this.knex('productos').insert(productList);
            console.log('Productos agregados');
        }
        catch (err) {
            console.log(err);
        }
    }

    async getAll() {
        try {
            const allProducts = await this.knex.from('productos').select('*');
            return allProducts;
        }
        catch (err) {
            console.log(err);
        }
    }

    async save(product) {
        product.price = parseInt(product.price);
        try {
            const id = await this.knex.from('productos').insert(product);
            return id[0];
        }
        catch (err) {
            console.log(err);
            return -1;
        }
    }

    closeConnection() {
        this.knex.destroy();
    }

    async getById(id) {
        const idToFind = parseInt(id);

        try {
            const product = await this.knex.from('productos').select('*').where({ id: idToFind });
            return product;
        }
        catch (err) {
            console.log(err);
            return null;
        }
    }
}

module.exports = ContenedorProductos;