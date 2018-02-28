'use strict';
module.exports = (sequelize, DataTypes) => {
  var Menu = sequelize.define('Menu', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {});
  Menu.associate = function(models) {
    // associations can be defined here
  };
  return Menu;
};