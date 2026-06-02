const { getAll, create, getOne, remove, update } = require('../controllers/estado.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT.js');
const estadosRouter = express.Router();

estadosRouter.route('/estado')
    .get(getAll)
    .post(verifyJWT,create);

estadosRouter.route('/estado/:id')
    .get(getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = estadosRouter;