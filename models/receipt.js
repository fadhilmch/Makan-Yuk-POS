'use strict';
module.exports = (sequelize, DataTypes) => {
  var Receipt = sequelize.define('Receipt', {
    PesananId: DataTypes.INTEGER,
    total: DataTypes.INTEGER
  }, {});
  Receipt.associate = function(models) {
    // associations can be defined here
  };
  return Receipt;
};
