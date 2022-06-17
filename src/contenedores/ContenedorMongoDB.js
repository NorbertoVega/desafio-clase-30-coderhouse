const mongoose = require("mongoose");
const config = require('../../config.js');

class ContenedorMongoDB {

    constructor(model, isInitialized) {
        if (isInitialized) {
            mongoose.connect(config.MONGO_CONNECTION_STRING, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log("Conectado a MongoDb");
        }

        this.model = model;
    }

    async save(objectToSave) {
        try {
            const objectToInsert = new this.model(objectToSave);
            await objectToInsert.save();
            return objectToInsert._id.toString();
        }
        catch (error) {
            throw new Error(`Hubo un problema en save(): ${error.message}`)
        }
    }

    async getById(id) {
        try {
            let response = await this.model.find({ _id: id }, { __v: 0 });
            if (response.length !== 0)
                return response[0];
            else
                return null;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }

    async getAll() {
        try {
            const response = await this.model.find();
            return response;
        }
        catch (error) {
            throw new Error(`Hubo un problema en getAll(): ${error.message}`)
        }
    }

    async deleteById(id) {
        try {
            const itemToEliminate = await this.getById(id);
            if (itemToEliminate !== null) {
                await this.model.deleteOne({ _id: id });
                return id;
            }
            else
                return null;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }

    async deleteAll() {
        try {
            const all = await this.getAll();
            for (let i = 0; i < all.length; i++) {
                this.deleteById(all[i].id);
            }
        }
        catch (error) {
            console.log(error);
            throw new Error(`Hubo un problema en deleteAll(): ${error.message}`)
        }
    }

    async updateById(id, object) {
        try {
            const itemToUpdate = await this.getById(id);
            if (itemToUpdate !== null) {
                await this.model.updateOne({ _id: id }, object);
                return id;
            }
            else
                return null;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
}

module.exports = ContenedorMongoDB;