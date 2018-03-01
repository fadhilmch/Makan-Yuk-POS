'use strict';

const sequelize = require('sequelize');
const op = sequelize.Op;

module.exports = (sequelize, DataTypes) => {
  var Menu = sequelize.define('Menu', {
    name: {
        type:DataTypes.STRING,
    },
    price: DataTypes.INTEGER,
    jenis: {
      type: DataTypes.STRING,
    }
  }, {});
  Menu.associate = function(models) {
    Menu.belongsToMany(models.Pesanan,{through: models.PesananMenu});
    Menu.hasMany(models.PesananMenu);
  };
  Menu.prototype.getPriceRupiah = function() {
      return "Rp. "+this.price.toLocaleString();
  }
  return Menu;
};
