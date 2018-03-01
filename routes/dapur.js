const express = require('express');
const router = express.Router();
const models = require('../models');
const checkLogin = require('../helpers/checkLogin');


router.get('/',checkLogin, (req, res)=>{
    models.Pesanan.findAll({
        include: 
        [{model: models.PesananMenu, attributes: ['id','status']},{model: models.Menu}]

    }).then(data =>{
        // res.send(data)
        res.render('./dapur/dapur.ejs', {data:data})
    })
})

router.get('/:id/done', (req, res) =>{
    models.PesananMenu.update({
        status: true
    },{ where: { id: req.params.id } 
    }).then(() =>{
        res.redirect('/dapur')
    })
})


module.exports = router;
