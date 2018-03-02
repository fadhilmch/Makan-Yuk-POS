const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const models = require('../models');
const checkLogin = require('../helpers/checkLogin');
const sequelize = require('sequelize');
const op = sequelize.Op;

const myMail = 'belanjamurahasik@gmail.com';


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: myMail,
    pass: 'ayokitabelanja'
  }
});

router.get('/',checkLogin, (req, res)=>{
    models.Pesanan.findAll({
        include:
        {model: models.PesananMenu, model: models.Menu},
        order:[['updatedAt','DESC']]
    }).then(data =>{
        // res.send(data)
        res.render('./kasir/kasir.ejs', {data:data})
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
        res.render('./kasir/kasir.ejs', {data:data})
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

router.post('/:id/struk', (req, res)=>{
    let mailOptions = {
        from: myMail,
        to: req.body.email,
        subject: `Struk Pembayaran Transaksi ID${req.params.id}`,
        text: 'Terima Kasih sudah berkunjung'
    };

    transporter.sendMail(mailOptions, (err,info) => {
        console.log(err + " - " + info);
        res.redirect(`/kasir/${req.params.id}/struk`)
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
