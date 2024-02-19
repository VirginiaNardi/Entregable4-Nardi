// const { Router } = require('express');
// const router = Router();
// const ProductManager = require('../classes/ProductManager');


// // Productos estáticos:
// router.get('/', async (req, res) => {
//     try {
//         res.status(200).render('home', {
//             style: 'index',
//             script: '',
//             title: 'Productos',
//             products: ProductManager.getProducts()
//         });

//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Error interno del servidor');
//     };
// });

// router.get('/realtimeproducts', async (req, res) => {
//     try {
//         res.status(200).render('realTimeProducts', {
//             style: 'index',
//             script: 'index',
//             title: 'Productos',
//         });

//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Error interno del servidor');
//     };
// });


// module.exports = router;
const { Router } = require('express');
const router = Router();
const ProductManager = require('../classes/ProductManager');

// Middleware para crear una instancia de ProductManager y adjuntarla al objeto de solicitud (req)
router.use((req, res, next) => {
    req.productManager = new ProductManager("productos.json");
    next();
});

// Rutas
router.get('/', async (req, res) => {
    try {
        res.status(200).render('home', {
            style: 'index',
            script: '',
            title: 'Productos',
            products: req.productManager.getProducts()
        });

    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    };
});

router.get('/realtimeproducts', async (req, res) => {
    try {
        res.status(200).render('realTimeProducts', {
            style: 'index',
            script: 'index',
            title: 'Productos',
        });

    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    };
});

module.exports = router;
