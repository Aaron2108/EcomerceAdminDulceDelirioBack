const { getAll, create, getOne, remove, update, login } = require('../controllers/user.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT.js');

const usersRouter = express.Router();
usersRouter.route('/user')
    .get(getAll)
    .post(create);

usersRouter.route('/user/login')
    .post(login);

usersRouter.route('/user/:id')
    .get(getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = usersRouter;