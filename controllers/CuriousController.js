const connection = require('../db/conn'); // Importe a conexão com o banco de dados aqui
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

module.exports = class CuriousController {
  static dashboard(req, res) {
    const userId = req.session.userid;

    const userQuery = `
    SELECT t.*, u.name as userName
    FROM curious t
    INNER JOIN Users u ON t.UserId = u.id
    WHERE u.id = ?;  -- Adicione esta cláusula para filtrar pelo ID do usuário
  `;

    connection.query(userQuery, [userId], (err, results) => {
      if (err) {
        console.error('Erro ao buscar receita:', err);
        return res.status(500).send('Erro ao buscar receita');
      }

      const curious = results;

      let emptyCurious = true;

      if (curious.length > 0) {
        emptyCurious = false;
      }

      res.render('curious/dashboard', { curious, emptyCurious });
    });
  }

  static createCurious(req, res) {
    res.render('curious/create');
  }

  static createCuriousSave(req, res) {
    const { title, link, description, servings, time_taken, content } = req.body;
    const userId = req.session.userid;

    const image = req.files.image;
    const imageExtension = image.name.split('.').pop();
    const uniqueImageName = crypto.randomBytes(16).toString('hex') + '.' + imageExtension;
    const imagePath = 'public/img/receitas/' + uniqueImageName;
    const decodedContent = decodeURIComponent(content);

    image.mv(imagePath, (err) => {
      if (err) {
        console.error('Erro ao fazer upload da imagem:', err);
        return res.status(500).send('Erro ao fazer upload da imagem');
      }

      const imageHash = crypto.createHash('sha256').update(uniqueImageName).digest('hex');

      const insertQuery = `
        INSERT INTO Curious (title, link, image, description, servings, time_taken, UserId, content)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;


      connection.query(insertQuery, [title, link, uniqueImageName, description, servings, time_taken, userId, decodedContent], (err) => {
        if (err) {
          console.error('Erro ao criar receita:', err);
          return res.status(500).send('Erro ao criar receita');
        }

        req.flash('message', 'Receita criada com sucesso!');
        req.session.save(() => {
          res.redirect('/curious/dashboard');
        });
      });
    });
  }

  static showCurious(req, res) {
    console.log(req.query);

    let search = '';
    if (req.query.search) {
      search = req.query.search;
    }

    let order = 'DESC';
    if (req.query.order === 'old') {
      order = 'ASC';
    } else {
      order = 'DESC';
    }

    const selectQuery = `
      SELECT t.*, u.name AS userName 
      FROM Curious t 
      LEFT JOIN Users u ON t.UserId = u.id 
      WHERE t.title LIKE ?
    `;

    connection.query(selectQuery, [`%${search}%`], (err, results) => {
      if (err) {
        console.error('Erro ao buscar receitas:', err);
        return res.status(500).send('Erro ao buscar receitas');
      }

      const curiousQty = results.length > 0;
      const curious = results;

      res.render('curious/home', { curious, curiousQty, search });
    });
  }


  static removeCurious(req, res) {
    const id = req.body.id;

    const deleteQuery = `
      DELETE FROM Curious WHERE id = ?
    `;

    connection.query(deleteQuery, [id], (err) => {
      if (err) {
        console.error('Erro ao remover receita:', err);
        return res.status(500).send('Erro ao remover receita');
      }

      req.flash('message', 'Receita removida com sucesso!');
      req.session.save(() => {
        res.redirect('/curious/dashboard');
      });
    });
  }

  static updateCurious(req, res) {
    const id = req.params.id;

    const selectQuery = `
      SELECT * FROM Curious WHERE id = ?
    `;

    connection.query(selectQuery, [id], (err, results) => {
      if (err) {
        console.error('Erro ao buscar receita:', err);
        return res.status(500).send('Erro ao buscar receita');
      }

      const curious = results[0];
      res.render('curious/edit', { curious });
    });
  }

  static updateCuriousPost(req, res) {
    const id = req.body.id;
    const title = req.body.title;
    const link = req.body.link;
    const description = req.body.description;
    const servings = req.body.servings;
    const time_taken = req.body.time_taken;
    const content = req.body.content;

    // Verifica se um novo arquivo de imagem foi enviado
    if (req.files && req.files.image) {
      const image = req.files.image;
      const imageExtension = image.name.split('.').pop();
      const uniqueImageName = crypto.randomBytes(16).toString('hex') + '.' + imageExtension;
      const imagePath = 'public/img/receitas/' + uniqueImageName;

      image.mv(imagePath, (err) => {
        if (err) {
          console.error('Erro ao fazer upload da imagem:', err);
          return res.status(500).send('Erro ao fazer upload da imagem');
        }

        const updateQuery = `
          UPDATE curious 
          SET title = ?, link = ?, description = ?, servings = ?, time_taken = ?, content = ?, image = ?
          WHERE id = ?
        `;

        connection.query(updateQuery, [title, link, description, servings, time_taken, content, uniqueImageName, id], (err) => {
          if (err) {
            console.error('Erro ao atualizar receita:', err);
            return res.status(500).send('Erro ao atualizar receita');
          }

          req.flash('message', 'Receita atualizada com sucesso!');
          req.session.save(() => {
            res.redirect('/curious/dashboard');
          });
        });
      });
    } else {
      // Caso não haja novo arquivo de imagem, apenas atualize os campos
      const updateQuery = `
        UPDATE curious 
        SET title = ?, link = ?, description = ?, servings = ?, time_taken = ?, content = ?
        WHERE id = ?
      `;

      connection.query(updateQuery, [title, link, description, servings, time_taken, content, id], (err) => {
        if (err) {
          console.error('Erro ao atualizar receita:', err);
          return res.status(500).send('Erro ao atualizar receita');
        }

        req.flash('message', 'Receita atualizada com sucesso!');
        req.session.save(() => {
          res.redirect('/curious/dashboard');
        });
      });
    }
  }

  static post(req, res) {
    const postId = req.params.id;

    const selectQuery = `
    SELECT * FROM Curious WHERE id = ?
  `;

    connection.query(selectQuery, [postId], (err, results) => {
      if (err) {
        console.error('Erro ao buscar receita:', err);
        return res.status(500).send('Erro ao buscar receita');
      }

      const curious = results[0];
      res.render('curious/post', { curious });
    });
  }


};