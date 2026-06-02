const { getAll, create, getOne, remove, update } = require('../controllers/producto.controller');
const express = require('express');
const upload = require('../utils/multer');
const verifyJWT = require('../utils/verifyJWT.js');
const productoRouter = express.Router();

productoRouter.route('/producto')
    .get(getAll)
    .post(verifyJWT, upload.single('image'), create);

productoRouter.route('/producto/:id')
    .get(getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, upload.single('image'), update);

module.exports = productoRouter;