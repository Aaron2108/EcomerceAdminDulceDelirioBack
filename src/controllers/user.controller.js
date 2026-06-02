const catchError = require("../utils/catchError");
const db = require('../models');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const getAll = catchError(async (req, res) => {
  const results = await db.user.findAll();
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const result = await db.user.create({ ...req.body, password: hashedPassword });
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await db.user.findByPk(id);
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await db.user.destroy({ where: { id } });
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await db.user.update(req.body, {
    where: { id },
    returning: true,
  });
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

const login = catchError(async (req, res) => {
  const { email, password } = req.body;
  const user = await db.user.findOne({ where: { email } });
  if (!user) return res.status(401).json({ error: "invalid credentials" });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ error: "invalid credentials" });

  const token = jwt.sign(
    { user },
    process.env.TOKEN_SECRET,
    // { expiresIn: '5m' }
  );

  return res.json({ user, token });
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  login
};
