const express = require('express');
const router = express.Router();
const models = require('../models')

router.get('/', (req, res) =>{
    // res.render('./menu/menu.ejs');
    models.Menu.findAll({}).then(dataMenu =>{
        res.render('./menu/menu.ejs', {data:dataMenu})
      })
})

router.get('/add', (req, res) =>{
    res.render('./menu/add-menu.ejs');
})

router.post('/add', (req, res) =>{
    models.Menu.create({
        name: req.body.name,
        price: req.body.price,
        jenis: req.body.jenis,
        createdAt: new Date(),
        updatedAt: new Date()
    }).then(function(){
        res.redirect('/menus')
    }).catch(err =>{
        res.send(err);
    });
});

router.get('/edit/:id', (req, res) =>{
    models.Menu.findById(req.params.id).then(dataMenu => {
        res.render('./menu/edit-menu.ejs', {data:dataMenu})
    });
});

router.post('/edit/:id', (req, res)=>{
    models.Menu.update({
        name: req.body.name,
        price: req.body.price,
        jenis: req.body.jenis,
        updatedAt: new Date()
    }, { where: { id: req.params.id }
    }).then(dataMenu =>{
        res.redirect('/menus');
    });
});

router.get('/delete/:id', (req, res)=>{
    models.Menu.destroy({
        where: { id: req.params.id }
    }).then(dataMenu =>{
        res.redirect('/menus');
    });
});

module.exports = router;

