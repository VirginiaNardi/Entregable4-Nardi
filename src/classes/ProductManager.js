const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
        this.products = this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error("Error al leer el archivo de productos:", error);
            return [];
        }
    }

    saveProducts() {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(this.products, null, 2));
        } catch (error) {
            console.error("Error al guardar el archivo de productos:", error);
        }
    }

    addProduct(title, description, thumbnail, stock, price) {
        const newProduct = {
            id: this.products.length + 1,
            title,
            description,
            thumbnail,
            stock,
            price
        };
        this.products.push(newProduct);
        this.saveProducts();
    }

    deleteProduct(productId) {
        this.products = this.products.filter(product => product.id !== productId);
        this.saveProducts();
    }

    getProducts() {
        return this.products;
    }
}

module.exports = ProductManager;
