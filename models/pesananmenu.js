'use strict';
module.exports = (sequelize, DataTypes) => {
  var PesananMenu = sequelize.define('PesananMenu', {
    MenuId: DataTypes.INTEGER,
    PesananId: DataTypes.INTEGER,
    quantity: {
        type: DataTypes.INTEGER,
        validate:{
            isNumeric:{
                args: true,
                msg: "Masukkan jumlah pesanan berupa angka!"
            }
        }
    },
    status: DataTypes.BOOLEAN,
    keterangan: DataTypes.STRING
  }, {
      hooks:{
          beforeCreate: (pesanan, options) => {
              pesanan.status = false;
              if(pesanan.keterangan == null || pesanan.keterangan == ""){
                  pesanan.keterangan = "Standar"
              }
          },
          beforeValidate: (pesanan, options) => {
              if(pesanan.quantity == null || pesanan.quantity == ""){
                  pesanan.quantity = 1
              }
          }
      }
  });
  PesananMenu.associate = function(models) {
    // associations can be defined here
    PesananMenu.belongsTo(models.Pesanan);
    PesananMenu.belongsTo(models.Menu);
  };
  return PesananMenu;
};
