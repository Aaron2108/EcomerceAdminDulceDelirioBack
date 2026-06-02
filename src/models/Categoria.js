const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Categoria = sequelize.define("categoria", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estadoId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
      references: {
        model: "estados",
        key: "id",
      },
    },
  });
  Categoria.associate = (models) => {
    Categoria.hasMany(models.producto, {
      foreignKey: "categoriaId",
      as: "productos",
    });
    Categoria.belongsTo(models.estado, {
      foreignKey: "estadoId",
      as: "estados",
    });
  };
  return Categoria;
};
