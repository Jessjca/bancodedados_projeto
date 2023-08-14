const connection = require('../db/conn'); // Importe a conexão com o banco de dados aqui
const bcrypt = require('bcryptjs');

module.exports = class UserController {
  static login(req, res) {
    res.render('auth/login');
  }

  static async loginPost(req, res) {
    const { email, password } = req.body;

    // find user
    const selectUserQuery = `
      SELECT * FROM Users WHERE email = ?
    `;

    connection.query(selectUserQuery, [email], async (err, results) => {
      if (err) {
        console.error('Erro ao buscar usuário:', err);
        return res.status(500).send('Erro ao buscar usuário');
      }

      const user = results[0];

      if (!user) {
        res.render('auth/login', {
          message: 'Usuário não encontrado!',
        });

        return;
      }

      // compare password
      const passwordMatch = bcrypt.compareSync(password, user.password);

      if (!passwordMatch) {
        res.render('auth/login', {
          message: 'Senha inválida!',
        });

        return;
      }

      // auth user
      req.session.userid = user.id;

      req.flash('message', 'Login realizado com sucesso!');

      req.session.save(() => {
        res.redirect('/');
      });
    });
  }

  static register(req, res) {
    res.render('auth/register');
  }

  static async registerPost(req, res) {
    const { name, email, password, confirmpassword } = req.body;

    // passwords match validation
    if (password != confirmpassword) {
      req.flash('message', 'As senhas não conferem, tente novamente!');
      res.render('auth/register');

      return;
    }

    // email validation
    const checkIfUserExistsQuery = `
      SELECT * FROM Users WHERE email = ?
    `;

    connection.query(checkIfUserExistsQuery, [email], async (err, results) => {
      if (err) {
        console.error('Erro ao verificar e-mail:', err);
        return res.status(500).send('Erro ao verificar e-mail');
      }

      if (results.length > 0) {
        req.flash('message', 'O e-mail já está em uso!');
        res.render('auth/register');

        return;
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const insertUserQuery = `
        INSERT INTO Users (name, email, password)
        VALUES (?, ?, ?)
      `;

      connection.query(
        insertUserQuery,
        [name, email, hashedPassword],
        (err, results) => {
          if (err) {
            console.error('Erro ao criar usuário:', err);
            return res.status(500).send('Erro ao criar usuário');
          }

          const userId = results.insertId;

          // initialize session
          req.session.userid = userId;

          req.flash('message', 'Cadastro realizado com sucesso!');

          req.session.save(() => {
            res.redirect('/');
          });
        }
      );
    });
  }

  static logout(req, res) {
    req.session.destroy();
    res.redirect('/login');
  }
};
