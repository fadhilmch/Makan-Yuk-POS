'use strict';
module.exports = (sequelize, DataTypes) => {
  var Pesanan = sequelize.define('Pesanan', {
    mejaId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {});
  Pesanan.associate = function(models) {
    // associations can be defined here
    Pesanan.belongsToMany(models.Menu,{through: models.PesananMenu});
    Pesanan.hasMany(models.PesananMenu);
  };
  return Pesanan;
};
