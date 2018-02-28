const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', (req, res) => {
    res.render('./pesanan/pesanan');
});

router.post('/', (req, res) => {
    let table_number = req.body.table_number;
    res.redirect(`/pesanan/meja/${table_number}/pesan`);
});

router.get('/meja/:id/pesan', (req, res) => {
    models.Menu.findAll()
        .then(menus => {
            res.render('./pesanan/pesanan-add', {
                menus:menus
            })
        });
});

router.post('/meja/:id/pesan', (req, res) => {

});

module.exports = router;
