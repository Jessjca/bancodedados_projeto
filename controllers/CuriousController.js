const Curious = require('../models/Curious')
const User = require('../models/User')

module.exports = class CuriousController {
    static async showCurious(req, res) {
        res.render('curious/home')
    }
}