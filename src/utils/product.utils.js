const {faker} = require('@faker-js/faker');

function generateProduct() {
    const products = [];
    for (let i = 0; i < 5; i++) {
        let product = {
            id: parseInt(faker.random.numeric(15)),
            title: faker.commerce.productName(),
            price: faker.commerce.price(100, 5000, 0, '$'),
            thumbnail: faker.image.imageUrl(1234, 2345, 'computer', true, true)
        }
        products.push(product);        
    }
    return products;
}

module.exports = generateProduct;