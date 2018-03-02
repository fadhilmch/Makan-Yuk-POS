const express = require('express');
const router = express.Router();
const models = require('../models');
const checkLogin = require('../helpers/checkLogin');
const sequelize = require('sequelize');
const op = sequelize.Op;
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

const myMail = 'belanjamurahasik@gmail.com';

var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        xoauth2: xoauth2.createXOAuth2Generator({
            user: myMail,
            clientId: '12541434386-6cambo9kr12pc4chglk7785r1jeoe6es.apps.googleusercontent.com',
            clientSecret: 'T5URaJr_9pliBtNXstZfVS6Z',
            refreshToke: ''
        })
    }
});


router.get('/',checkLogin, (req, res)=>{
    models.Pesanan.findAll({
        include:
        {model: models.PesananMenu, model: models.Menu},
        order:[['updatedAt','DESC']]
    }).then(data =>{
        // res.send(data)
        res.render('./kasir/kasir.ejs', {data:data, user:req.session.user})
    })
})

router.get('/active',checkLogin, (req, res)=>{
    models.Pesanan.findAll({
        include:
        {model: models.PesananMenu, model: models.Menu},
        where:{
            status:{
                [op.in]:['On Process','Served','Ordering']
            }
        },
        order:[['updatedAt','DESC']]
    }).then(data =>{
        // res.send(data)
        res.render('./kasir/kasir.ejs', {data:data, user:req.session.user})
    })
})

router.get('/history',checkLogin, (req, res)=>{
    models.Pesanan.findAll({
        include:
        {model: models.PesananMenu, model: models.Menu},
        where:{
            status:{
                [op.notIn]:['On Process','Served','Ordering']
            }
        },
        order:[['updatedAt','DESC']]
    }).then(data =>{
        // res.send(data)
        res.render('./kasir/kasir.ejs', {data:data, user:req.session.user})
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
        res.render('./kasir/struk.ejs', {data:data, user:req.session.user})
    })
})

router.post('/:id/struk', (req, res)=>{

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
