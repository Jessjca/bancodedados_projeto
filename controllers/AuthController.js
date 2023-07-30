module.exports = class AuthController {
    static login(req, res) {
        res.render('auth/login', { layout: false });
    }

    static register(req, res) {
        res.render('auth/register', { layout: false });
    }
}
