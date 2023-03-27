const Sequelize = require('sequelize');
const sequelize = require('../context/appContext');

const Autor = sequelize.define('Autor', {
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
    correo:{
        type: Sequelize.STRING,
        allowNull: true,
    }
});
module.exports = Autor;
