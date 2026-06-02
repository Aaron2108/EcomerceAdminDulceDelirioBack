const catchError = require('../utils/catchError');
const db = require('../models');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary');

const getAll = catchError(async(req, res) => {
    const results = await db.categoria.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const file = req.file;
    const { url } = await uploadToCloudinary(file);
    const data = {
        ...req.body,
        url
    }
    const result = await db.categoria.create(data);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await db.categoria.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const categoria = await db.categoria.findOne({ where: {id} });
    if(!categoria) return res.sendStatus(404);

    if(categoria.url) {
        await deleteFromCloudinary
        (categoria.url);
    }

    await db.categoria.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const updateData = {
        ...req.body
    };
    if(req.file) {
        const { url } = await uploadToCloudinary(req.file);
        updateData.url = url;
    }
    const result = await db.categoria.update(
        updateData,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}