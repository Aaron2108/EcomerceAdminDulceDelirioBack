const express = require('express');
const estadosRouter = require('./estado.router');
const categoriasRouter = require('./categoria.router');
const productoRouter = require('./producto.router');
const usersRouter = require('./user.router');
const router = express.Router();

// colocar las rutas aquí
router.use(estadosRouter)
router.use(categoriasRouter)
router.use(productoRouter)
router.use(usersRouter);

module.exports = router;