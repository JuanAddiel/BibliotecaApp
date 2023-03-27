const Sequelize = require('sequelize');
const sequelize = require('../context/appContext');

const Categorias = sequelize.define('Categorias', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nombre:{ 
        type: Sequelize.STRING,
        allowNull: false
    },
    descripcion:{
        type: Sequelize.STRING,
        allowNull: true,
      }
});

module.exports = Categorias;
