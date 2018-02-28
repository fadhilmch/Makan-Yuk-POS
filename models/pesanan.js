'use strict';
module.exports = (sequelize, DataTypes) => {
  var Pesanan = sequelize.define('Pesanan', {
    mejaId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {});
  Pesanan.associate = function(models) {
    // associations can be defined here
  };
  return Pesanan;
};
