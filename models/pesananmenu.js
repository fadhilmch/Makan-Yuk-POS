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
                  pesanan.keterangan = "-"
              }
          },
          beforeValidate: (pesanan, options) => {
              if(pesanan.quantity == null || pesanan.quantity == ""){
                  pesanan.quantity = 1
              }
          },
          afterUpdate:(pesanan,options) =>{
              sequelize.models.Pesanan.findOne({
                  include:[
                      {model:sequelize.models.PesananMenu}
                  ],
                  where:{
                      id:pesanan.PesananId
                  }
              }).then(data => {
                  let statusArr = data.PesananMenus.map(val => val.status);
                  console.log(statusArr);
                  if(statusArr.indexOf(false)==-1){
                      console.log("SERVED");
                      sequelize.models.Pesanan.update({
                          status:"Served"
                      },{
                          where:{
                              id:pesanan.PesananId
                          }
                      })
                  }
                  console.log("=======>>>> Data: "+JSON.stringify(data.PesananMenus));
              })
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
