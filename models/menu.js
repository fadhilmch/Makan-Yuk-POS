'use strict';

const sequelize = require('sequelize');
const op = sequelize.Op;

module.exports = (sequelize, DataTypes) => {
  var Menu = sequelize.define('Menu', {
    name: {
        type:DataTypes.STRING,
    },
    price: {
        type: DataTypes.INTEGER,
        validate: {
            isInRange(value){
                if(this.jenis == 'makanan'){
                    if(value>100000){
                        throw new Error('Harga terlalu mahal untuk makanan! ');
                    }
                    else if(value<10000){
                        throw new Error('Harga terlalu murah untuk makanan!')
                    }
                }
                else{
                    if(value>40000){
                        throw new Error('Harga terlalu mahal untuk minuman! ');
                    }
                    else if(value<3000){
                        throw new Error('Harga terlalu murah untuk minuman!')
                    }
                }

            }
        }
    },
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
