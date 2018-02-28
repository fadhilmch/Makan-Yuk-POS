'use strict';
module.exports = (sequelize, DataTypes) => {
  var Menu = sequelize.define('Menu', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    jenis: DataTypes.STRING
  }, {});
  Menu.associate = function(models) {
    // associations can be defined here
    Menu.belongsToMany(models.Pesanan,{through: models.PesananMenu});
    Menu.hasMany(models.PesananMenu);
  };
  return Menu;
};
