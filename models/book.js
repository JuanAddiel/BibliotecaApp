const Sequelize = require('sequelize');
const sequelize = require('../context/appContext');

const Book = sequelize.define('Book', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    titulo:{ 
        type: Sequelize.STRING,
        allowNull: false
    },
    ano:{
        type: Sequelize.STRING,
        allowNull: true,
      },
    imagen:{
        type: Sequelize.STRING,
        allowNull: true,
    }
});
module.exports = Book;
