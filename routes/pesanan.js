const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', (req, res) => {
    res.render('./pesanan/pesanan');
});

router.post('/', (req, res) => {
    let table_number = req.body.table_number;
    models.Pesanan.create({
        mejaId: table_number,
        status: "Ordering",
        createdAt: new Date(),
        updatedAt: new Date()
    }).then((pesanan) => {
        res.redirect(`/pesanan/${pesanan.id}/meja/${table_number}/pesan`);
    })
});


router.get('/:id/meja/:no_meja/pesan', (req, res) => {
    models.Pesanan.findById(req.params.id,{
        include:[
            {model: models.PesananMenu},
            {model: models.Menu}
        ]
    }).then((pesanan) => {
        res.render('./pesanan/pesanan-list', {
            pesanan:pesanan
        });
    })
});

router.post('/:id/meja/:no_meja/pesan', (req, res) => {

});

router.get('/:id/meja/:no_meja/pesan/add', (req, res) => {
    models.Menu.findAll()
        .then(menus => {
            res.render('./pesanan/pesanan-add', {
                mejaId:req.params.id,menus:menus
            })
        });
});

router.post('/:id/meja/:no_meja/pesan/add', (req, res) => {
    console.log("masuk");
    models.Pesanan.findAll({
        where:{
            mejaId:req.params.id,
            status: "Ordering"
        }
    }).then(pesanan => {
        console.log(pesanan);
        models.PesananMenu.create({
            MenuId:req.body.MenuId,
            PesananId:pesanan[0].id,
            quantity:req.body.quantity
        }).then(() => {
            res.redirect('/pesanan/meja/${req.params.id}/pesan')
        })
    })
});

module.exports = router;
