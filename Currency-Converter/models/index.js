const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize with SQLite database
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

// Define a model for favorite currency pairs
const FavoritePair = sequelize.define('FavoritePair', {
    baseCurrency: {
        type: DataTypes.STRING,
        allowNull: false
    },
    targetCurrency: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Sync the model with the database
sequelize.sync();

module.exports = { FavoritePair };
