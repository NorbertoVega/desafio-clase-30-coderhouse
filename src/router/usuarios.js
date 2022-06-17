const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const connectMongo = require('connect-mongo');
const passport = require('passport');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const config =require('../../config.js');

const UsusariosDaoMongoDB = require('../daos/UsuariosDaoMongoDB');
const contenedorUsuarios = new UsusariosDaoMongoDB(false);

const router = express();

const MongoStore = connectMongo.create({
    mongoUrl: config.MONGO_CONNECTION_STRING_SESSIONS,
    ttl: config.MONGO_TTL_SESSIONS
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        contenedorUsuarios.getAll().then(async (allUsers) => {
            const usuario = allUsers.find(usuario => usuario.email === username);
            if (!usuario) {
                console.log('Usuario no existe');
                return done(null, false);
            }
            else {
                const result = await bcrypt.compare(password, usuario.password)
                if (!result) {
                    console.log('Credenciales incorrectas');
                    return done(null, false);
                } else {
                    console.log('Usuario autenticado');
                    return done(null, usuario);
                }
            }
        })
    }
));

passport.serializeUser((usuario, done) => {
    done(null, usuario.email);
});

passport.deserializeUser((email, done) => {
    contenedorUsuarios.getAll().then((allUsers) => {
        const usuario = allUsers.find(usuario => usuario.email === email);
        done(null, usuario);
    }
    );
});

function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.send({ result: 'ERROR' });
    }
}

router.use(cookieParser());
router.use(session({
    store: MongoStore,
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: config.COOKIE_MAX_AGE
    }
}));

router.use(passport.initialize());
router.use(passport.session());

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());

router.post('/login', passport.authenticate('local', { successRedirect: '/index.html', failureRedirect: '/login-error.html' }));

router.post('/registro', async (req, res) => {
    try {
        const { email, password } = req.body;
        const allUsers = await contenedorUsuarios.getAll();
        const usuario = allUsers.find(user => user.email === email);
        if (usuario) {
            res.send({ result: 'ERROR' });
        }
        else {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            if (!hashedPassword)
                res.send({ result: 'ERROR' });
            else {
                contenedorUsuarios.save({ email, password: hashedPassword })
                res.send({ result: 'SUCCESS' });
            }
        }
    }
    catch (err) {
        console.log(err);
        res.send({ result: 'ERROR' });
    }

});

router.get('/logout', (req, res) => {
    try {
        req.session.destroy(err => {
            if (!err)
                res.send({ result: 'logout ok', name: req.user.email });
            else
                res.send({ error: `Logout failed. Error: ${err}` });
        });
    }
    catch (err) {
        console.log(err);
        res.send({ error: err });
    }
});

router.get('/sessionstatus', isAuth, (req, res) => {
    try {
        res.send({ email: req.user.email });
    }
    catch (err) {
        console.log(err);
        res.send({ error: err });
    }
});

module.exports = router;