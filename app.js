const express = require('express');
const routerIndex = require('./routes/index');
const routerMenu = require('./routes/menu');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));

app.set('view engine', 'ejs');

app.use(express.static('public'));

// ROUTES
app.use('/', routerIndex);
app.use('/menu', routerMenu);


app.listen(3000, function(err){
    console.log('Aplikasi berjalan di 3000')
})

