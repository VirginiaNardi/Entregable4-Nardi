const express = require('express');
const { Server } = require('socket.io');
const viewsRouter = require('./routes/views.router');
const handlebars = require('express-handlebars');
const ProductManager = require('./classes/ProductManager');

const app = express();
const port = 8080; 

app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'));

// Views Handler
app.use('/', viewsRouter);

const httpServer = app.listen(port, () => {
    console.log(`Servidor activo en el puerto: ${port}`);
});

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
    console.log('Nuevo cliente conectado...');
    const productManager = new ProductManager("productos.json"); 
    const products = productManager.getProducts();
    socketServer.emit('products', products);

    socket.on('newProduct', (product) => {
        productManager.addProduct(product.title, product.description, product.thumbnail, product.stock, product.price);
        const updatedProducts = productManager.getProducts(); // Actualizar la lista de productos después de agregar uno nuevo
        socketServer.emit('products', updatedProducts);
    });

    socket.on('deleteProduct', (productId) => { // Cambiado de 'product' a 'productId' para ser más claro
        productManager.deleteProduct(Number(productId));
        const updatedProducts = productManager.getProducts(); 
    });
});
