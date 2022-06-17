const config = require('../../../config.js');

const options = {
    client: config.MARIA_DB_CLIENT,
    connection: {
        host: config.MARIA_DB_HOST,
        user: config.MARIA_DB_USER,
        password: config.MARIA_DB_PASSWORD,
        database: config.MARIA_DB_DATABASE_NAME
    }
}

module.exports = options;