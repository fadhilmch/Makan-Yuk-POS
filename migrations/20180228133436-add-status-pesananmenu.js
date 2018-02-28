'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
   return queryInterface.addColumn('PesananMenus', 'status', {type: Sequelize.BOOLEAN})
  },

  down: (queryInterface, Sequelize) => {
    
  }
};
