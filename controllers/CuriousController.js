const path = require('path');
const Curious = require('../models/Curious');
const User = require('../models/User');

module.exports = class CuriousController {
    static async showCurious(req, res) {
        const viewPath = path.join('curious', 'home');
        res.render(viewPath);
    }
}
