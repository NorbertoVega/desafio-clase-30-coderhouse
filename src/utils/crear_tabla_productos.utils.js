const ContenedorProductos = require('../contenedores/ContenedorProductos');
const optionsMariaDB = require('../contenedores/options/mariaDB');

const contenedorProductos = new ContenedorProductos(optionsMariaDB);

const products = [
    {
        title: " Monitor Samsung C24RG5",
        price: 25499,
        thumbnail: "https://http2.mlstatic.com/D_NQ_NP_2X_896735-MLA45212708765_032021-F.webp",
    },
    {
        title: "Procesador gamer AMD Ryzen 5 5600X",
        price: 46500,
        thumbnail: "https://http2.mlstatic.com/D_NQ_NP_2X_806834-MLA44347094824_122020-F.webp",
    },
    {
        title: "Motherboard Mother Asus Prime A320m-k",
        price: 7500,
        thumbnail: "https://http2.mlstatic.com/D_NQ_NP_2X_814476-MLA47101074241_082021-F.webp",
    }
];

contenedorProductos.createTable().then(async () => {
    console.log('Tabla productos creada correctamente');
    try {
        await contenedorProductos.insertMockProducts(products);
        contenedorProductos.closeConnection();
    }
    catch (err) {
        console.log("Hubo un error al cargar los productos de prueba: " + err);
    }
});