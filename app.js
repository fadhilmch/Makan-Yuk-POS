const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const routerIndex = require('./routes/index');
const routerMenu = require('./routes/menu');
const routerPesanan = require('./routes/pesanan');
const routerKasir = require('./routes/kasir');
const routerDapur = require('./routes/dapur');
const checkLogin = require('./helpers/checkLogin');

const app = express();

app.locals.helper = require('./helpers/helpers.js');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(session({
    secret: "makanyukpos",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(express.static('public'));

// ROUTES
app.use('/', routerIndex);
app.use('/menus', routerMenu);
app.use('/pesanan', routerPesanan);
app.use('/kasir', routerKasir);
app.use('/dapur', routerDapur);

app.listen(3000, function(err){
    console.log('Aplikasi berjalan di 3000')
})
