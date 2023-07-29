const express = require('express')
const exphbs  = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()
const conn = require('./db/conn')

//models
const Curious = require('./models/Curious')
const User = require('./models/User')

//import routes
const CuriousRoutes = require('./routes/CuriousRoutes')
//import controller
const CuriousController = require('./controllers/CuriousController')

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(
    express.urlencoded({
        extended: true
    }),
)

app.use(express.json())

app.use(
    session({
        name: "session",
        secret: "nosso_secret",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function() {},
            path: require('path').join(require('os').tmpdir(), 'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    }),
)

//flash messages
app.use(flash())

//public path
app.use(express.static('public'))

app.use((req, res, next) => {
    if(req.session.userid) {
        res.locals.session = req.session
    }

    next()
})

//routes
app.use('/curious', CuriousRoutes)

app.get('/', CuriousController.showCurious)

conn
    //.sync({force: true})
    .sync()
    .then(() => {
        app.listen(3000)
    })
    .catch((err) => console.log(err))