const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Producto = sequelize.define("producto", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    descuento: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    tamano: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoriaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categoria",
        key: "id",
      },
    },
    estadoId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
      references: {
        model: "estados",
        key: "id",
      },
    }
  });
    Producto.associate = (models) => {
    Producto.belongsTo(models.categoria, {
      foreignKey: "categoriaId",
      as: "categorias",
    });
    Producto.belongsTo(models.estado, {
      foreignKey: "estadoId",
      as: "estados",
    });
  };
  return Producto;
};
