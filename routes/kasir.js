const express = require('express');
const router = express.Router();
const models = require('../models')

router.get('/', (req, res)=>{
    models.Pesanan.findAll({
        include: 
        {model: models.PesananMenu, model: models.Menu}
    }).then(data =>{
        // res.send(data)
        res.render('./kasir/kasir.ejs', {data:data})
    })
})

router.get('/:id/struk', (req, res)=>{
    models.Pesanan.findAll({
        where: {id: req.params.id},
        include: [
            {model: models.PesananMenu},
            {model: models.Menu}
        ]
    }).then(data => {
        // res.send(data)
        res.render('./kasir/struk.ejs', {data:data})
    })
})


router.get('/:id/bayar', (req, res) =>{
    models.Pesanan.update({
        status: 'done'
    }, {
        where: {id: req.params.id}
    }).then(() => {
        res.redirect('/kasir')
    })
})


module.exports = router;

