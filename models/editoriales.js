const Sequelize = require('sequelize');
const sequelize = require('../context/appContext');

const Editorial = sequelize.define('Editorial', {
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
    telefono:{
        type: Sequelize.STRING,
        allowNull: true,
      },
    pais:{
        type: Sequelize.STRING,
        allowNull: true,
    }
});

module.exports = Editorial;
