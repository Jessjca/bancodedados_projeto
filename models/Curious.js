const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const User = require('../models/User')
//user
const Curious = db.define('Curious', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
})

Curious.belongsTo(User)
User.hasMany(Curious)

module.exports = Curious