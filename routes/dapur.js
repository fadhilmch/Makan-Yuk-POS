const express = require('express');
const router = express.Router();
const models = require('../models');
const checkLogin = require('../helpers/checkLogin');


router.get('/',checkLogin, (req, res)=>{
    models.Pesanan.findAll({
        include:
        {model: models.PesananMenu, model: models.Menu}
    }).then(data =>{
        res.send(data)
        // res.render('./dapur/dapur.ejs', {data:data})
    })
})


module.exports = router;
