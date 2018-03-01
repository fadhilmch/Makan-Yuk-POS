const express = require('express');
const router = express.Router();
const models = require('../models');
const sequelize = require('sequelize');
const op = sequelize.Op;

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
    let err = req.query;
    models.Pesanan.findById(req.params.id,{
        include:[
            {model: models.PesananMenu},
            {model: models.Menu}
        ],
    }).then((pesanan) => {
        // res.send(pesanan);
        models.Menu.findAll({
            where:{
                id:{
                    [op.notIn]:(pesanan.Menus.map(val => val.id))
                }
            }
        })
            .then(menus => {
                res.render('./pesanan/pesanan-list', {
                   pesanan:pesanan,menus:menus,err:err
               });
            });
    })
});

router.post('/:id/meja/:no_meja/pesan', (req, res) => {
    models.PesananMenu.create({
        MenuId:req.body.MenuId,
        PesananId:req.params.id,
        quantity:req.body.quantity,
        keterangan:req.body.keterangan
    }).then(() => {
        res.redirect(`/pesanan/${req.params.id}/meja/${req.params.no_meja}/pesan`)
    }).catch(err => {
        res.redirect(`/pesanan/${req.params.id}/meja/${req.params.no_meja}/pesan?err=${err.message}`)
    })
});

router.get('/:id/meja/:no_meja/pesan/edit/:id_menu', (req,res) => {
    models.Pesanan.findById(req.params.id,{
        include:[
            {model: models.PesananMenu},
            {model: models.Menu}
        ]
    }).then((pesanan) => {
        // res.send(pesanan);
        models.Menu.findAll({
            where:{
                id:{
                    [op.notIn]:(pesanan.Menus.map(val => val.id))
                }
            }
        }).then(menus => {
            // res.send(menus);
            res.render('./pesanan/pesanan-edit', {id_menu:req.params.id_menu,menus:menus,pesanan:pesanan});
        })
    })
});

// router.get('/:id/meja/:no_meja/pesan/edit/:id_menu', (req,res) => {
//     models.PesananMenu.findAll({
//         attributes:['id','MenuId','PesananId','quantity'],
//         include: [
//             {model: models.Pesanan},
//             {model: models.Menu}
//         ],
//         where:{
//             MenuId: req.params.id_menu,
//             PesananId: req.params.id
//         }
//     }).then((pesanan => {
//         // res.send(pesanan[0]);
//         res.render('./pesanan/pesanan-edit', {MenuId:req.params.id_menu,PesananId:req.params.id,pesanan:pesanan});
//     }))
// });

router.post('/:id/meja/:no_meja/pesan/edit/:id_menu', (req,res) => {
    models.PesananMenu.update({
        quantity:req.body.quantity,
        keterangan:req.body.keterangan
    },{
        where:{
            MenuId:req.params.id_menu,
            PesananId: req.params.id
        }
    }).then(() => {
        res.redirect(`/pesanan/${req.params.id}/meja/${req.params.no_meja}/pesan`)
    })
});

router.get('/:id/meja/:no_meja/pesan/delete/:id_menu', (req,res) => {
    models.PesananMenu.destroy({
        where:{
            MenuId:req.params.id_menu,
            PesananId: req.params.id
        }
    }).then(() => {
        res.redirect(`/pesanan/${req.params.id}/meja/${req.params.no_meja}/pesan`)
    })
});

module.exports = router;
