const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('curious', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',

} )

try {
    sequelize.authenticate()
    console.log('Conectamos com sucesso')
} catch(err) {
    console.log(`Não foi possivel conectar: ${err}`)
}

module.exports = sequelize