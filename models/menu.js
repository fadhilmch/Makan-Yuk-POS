'use strict';
module.exports = (sequelize, DataTypes) => {
  var Menu = sequelize.define('Menu', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    jenis: DataTypes.STRING
    // jenis: {
    //   type: sequelize.STRING,
    //   validate: {
    //     mustNumber(value){
    //       if(typeof value != 'integer'){
    //         throw new Error("Hanya bisa diisi angka !")
            
    //       }
    //     }
    //   }
    // }
  }, {});
  Menu.associate = function(models) {
    Menu.belongsToMany(models.Pesanan,{through: models.PesananMenu});
    Menu.hasMany(models.PesananMenu);
  };
  return Menu;
};
