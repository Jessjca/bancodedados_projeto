const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const flash = require("express-flash");
const mysql = require("mysql");
const fileUpload = require('express-fileupload');


const app = express();

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "curious",
});

conn.connect((err) => {
  if (err) {
    console.error("Erro ao conectar com o MySQL:", err);
    return;
  }
  console.log("Conectado ao MySQL!");

  // Routes
  const curiousRoutes = require("./routes/curiousRoutes");
  const authRoutes = require("./routes/authRoutes");
  const CuriousController = require("./controllers/CuriousController");

  app.use(fileUpload());
  app.engine("handlebars", exphbs());
  app.set("view engine", "handlebars");

  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  app.use(express.json());

  // Session middleware
  const sessionStore = new MySQLStore({
    host: "localhost",
    user: "root",
    password: "",
    database: "curious",
  });

  app.use(
    session({
      name: "session",
      secret: "nosso_secret",
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
      cookie: {
        secure: false,
        maxAge: 3600000,
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
      },
    })
  );

  // Flash messages
  app.use(flash());

  app.use(express.static("public"));

  // Set session to res
  app.use((req, res, next) => {
    console.log(req.session.userid);

    if (req.session.userid) {
      res.locals.session = req.session;
    }

    next();
  });

  app.use("/curious", curiousRoutes);
  app.use("/", authRoutes);

  app.get("/", CuriousController.showCurious);

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`O servidor está rodando em http://localhost:${PORT}/`);
  });
});