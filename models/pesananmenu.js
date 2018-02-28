'use strict';
module.exports = (sequelize, DataTypes) => {
  var PesananMenu = sequelize.define('PesananMenu', {
    MenuId: DataTypes.INTEGER,
    PesananId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {});
  PesananMenu.associate = function(models) {
    // associations can be defined here
  };
  return PesananMenu;
};
