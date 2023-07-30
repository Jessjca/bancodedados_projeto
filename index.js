const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');
const path = require('path');

const app = express();
const conn = require('./db/conn');

//models
const Curious = require('./models/Curious');
const User = require('./models/User');

//import routes
const CuriousRoutes = require('./routes/CuriousRoutes');
const authRoutes = require('./routes/authRoutes');
//import controller
const CuriousController = require('./controllers/CuriousController');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Create an instance of the handlebars engine and configure it
const hbs = exphbs.create({
  defaultLayout: 'main', // Define o layout padrão como 'main.handlebars'
  layoutsDir: path.join(__dirname, 'views/layouts'), // Pasta de layouts
  partialsDir: path.join(__dirname, 'views/partials'), // Pasta de partials (se houver)
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(
  express.urlencoded({
    extended: true
  }),
);

app.use(express.json());

app.use(
  session({
    name: "session",
    secret: "nosso_secret",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () { },
      path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now() + 360000),
      httpOnly: true
    }
  }),
);

//flash messages
app.use(flash());

//public path
app.use(express.static('public'));

//routes for login and register
app.use('/', authRoutes);
app.use('/curious', CuriousRoutes);

app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session;
  }
  next();
});

//route for the home page
app.get('/', CuriousController.showCurious);

conn
  //.sync({force: true})
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
