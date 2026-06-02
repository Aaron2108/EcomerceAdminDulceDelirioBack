const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Estado = sequelize.define("estado", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Estado.associate = (models) => {
    Estado.hasMany(models.producto, {
      foreignKey: "estadoId",
      as: "productos",
    });
    Estado.belongsTo(models.categoria, {
      foreignKey: "estadoId",
      as: "categorias",
    });
  };

  return Estado;
};
