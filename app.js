const express = require('express');
const routerIndex = require('./routes/index');

const app = express();

app.use('/', routerIndex)



app.listen(3000, function(err){
    console.log('Aplikasi berjalan di 3000')
})

