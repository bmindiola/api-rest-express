const express = require('express')

const products = [
    { id: 1, name: "Hola", price: 800 },
    { id: 2, name: "iPad", price: 650 },
    { id: 3, name: "iWatch", price: 750 },
];

const app = express();

// Middleware
app.use( express.json() );

// Petición POST (Create product)
app.post('/api/products', (req, res) => {
    const {name, price} = req.body;

    const newProduct = {
        id: products.length + 1,
        name,
        price
    }

    products.push(newProduct);

    res.status(201).json(newProduct)
});

// Status Codes (Códigos de estado), respuesta del servidor haci el cliente
// res.status(200) // ok
// res.status(201) // create (Creado correctamente)
// res.status(204) // No content (no hay contenido)
// res.status(400) // Bad Request (Petición erronea por parte del cliente)
// res.status(401) // Unauthorized (sin autorización)
// res.status(403) // Forbidden (Restringido)
// res.status(404) // Not Found (No encontrado)
// res.status(500) // Server error (error del servidor)



// Petición GET (obtener, read all products)
app.get('/api/products', (req, res) => {
    res.json(products)
});

// GET Product By Id (Obtener un producto por ID mediante params)
app.get('/api/products/:productId', (req, res) => {
    const id = Number( req.params.productId );
    // mediante el método find, obtener el producto por ID
    const product = products.find(p => id === p.id);

    if(!product){
        return res.status(404).send('Product no found')
    }

    res.json(product);
});

// PUT (Update product By ID), actualizar producto por ID
app.put('/api/products/:productId', (req, res) => {
    const id = Number( req.params.productId );
    const index = products.findIndex( p => p.id === id);

    if(index === -1) {
        return res.status(404).send('Product not found');
    }

    const {name, price} = req.body;

    const updateProduct = {
        id: products[index].id,
        name,
        price
    };

    products[index] = updateProduct;

    res.status(200).json('Product updated');
});

// DELETE (Delete product by id), eliminar producto por ID
app.delete('/api/products/:productId', (req, res) => {
    const id = Number( req.params.productId );
    const index = products.findIndex( p => p.id === id);

    if(index === -1) {
        return res.status(404).send('Product not found');
    }

    products.splice(index, 1);

    res.status(200).json('Product deleted');
});


// Ejecutar el servidor
const port = 4200;

app.listen(port, () => {
    console.log(`Server on http://localhost:${port}`)
})
