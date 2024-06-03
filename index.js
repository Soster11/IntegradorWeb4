const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DB,{ useNewUrlParser: true,
useUnifiedTopology: true})
.then(() => {
})
.catch((error) => {
console.error('Error de conexión a la base de datos', error);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// ESQUEMA PRODUCTOS
const productoSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    descripción: String
    });
const Producto = mongoose.model('Producto', productoSchema);

// ESQUEMA USUARIOS
const usuarioSchema = new mongoose.Schema({
    nombre: String,
    edad: Number,
    correo: String
    });
const usuario = mongoose.model('Usuario', usuarioSchema);



//VERBOS PARA PRODUCTOS
// Operación para obtener todos los productos
app.get('/', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
} catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).send('Error al obtener productos');
}
});
// Operación para agregar un nuevo producto
app.post('/productos', async (req, res) => {
try {
    const { nombre, precio, descripcion } = req.body;
    const nuevoProducto = new Producto({ nombre, precio, descripcion });
    
    await nuevoProducto.save();
res.status(201).json(nuevoProducto);
} catch (error) {
    console.error('Error al agregar producto:', error);
    res.status(500).send('Error al agregar producto');
}
});
// Operación para actualizar un producto por ID
app.put('/productos/:id', async (req, res) => {
// ...
});
// Operación para eliminar un producto por ID
app.delete('/productos/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    datos = datos.filter((item) => item.id !== id);
    res.json ({ mensaje: 'Dato eliminado exitosamente' });
});


//VERBOS PARA USUARIOS
// Operación para obtener todos los usuarios
app.get('/', async (req, res) => {
    try {
        const usuario = await usuario.find();
        res.json(usuario);
} catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).send('Error al obtener usuarios');
}
});
// Operación para agregar un nuevo usuario
app.post('/usuario', async (req, res) => {
try {
    const { nombre, edad, correo } = req.body;
    const nuevoUsuario = new usuario({ nombre, edad, correo });
    
    await nuevoUsuario.save();
res.status(201).json(nuevoUsuario);
} catch (error) {
    console.error('Error al agregar usuario:', error);
    res.status(500).send('Error al agregar usuario');
}
});
// Operación para actualizar un usuario por ID
app.put('/usuario/:id', async (req, res) => {
// ...
});
// Operación para eliminar un usuario por ID
app.delete('/usuario/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    datos = datos.filter((item) => item.id !== id);
    res.json ({ mensaje: 'Dato eliminado exitosamente' });
});


app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
    });
