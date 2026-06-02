const { getAll, create, getOne, remove, update } = require('../controllers/categoria.controller');
const express = require('express');
const categoriasRouter = express.Router();
const upload = require('../utils/multer');
const verifyJWT = require('../utils/verifyJWT.js');

categoriasRouter.route('/categoria')
    .get(getAll)
    .post(verifyJWT, upload.single('image'), create);

categoriasRouter.route('/categoria/:id')
    .get(getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, upload.single('image'), update);

module.exports = categoriasRouter;