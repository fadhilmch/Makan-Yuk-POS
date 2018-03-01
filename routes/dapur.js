const express = require('express');
const router = express.Router();
const models = require('../models');
const checkLogin = require('../helpers/checkLogin');


// router.get('/',checkLogin, (req, res)=>{
//     models.Pesanan.findAll({
//         include:
//         [{model: models.PesananMenu, attributes: ['id','status']},{model: models.Menu}]
//
//     }).then(data =>{
//         // res.send(data)
//         res.render('./dapur/dapur.ejs', {data:data})
//     })
// })

router.get('/', (req, res)=>{
    res.redirect('/dapur/makanan');
})

router.get('/makanan',(req,res) => {
    models.PesananMenu.findAll({
        attributes:['id','quantity','keterangan','PesananId','status'],
        include:[
            {
                model: models.Pesanan,
                where:{
                    status:'On Process'
                }
             },{
                 model: models.Menu,
                 where: {
                     jenis:'makanan'
                 }
             }
         ],
         where:{
             status:false
         },
         order:[['createdAt','ASC']],
    }).then(data =>{
        // res.send(data)
        models.PesananMenu.findAll({
            attributes:['id','quantity','keterangan','PesananId','status'],
            include:[
                {
                    model: models.Pesanan,
                    where:{
                        status:'On Process'
                    }
                 },{
                     model: models.Menu,
                     where: {
                         jenis:'makanan'
                     }
                 }
             ],
             where:{
                 status:true
             },
             order:[['createdAt','ASC']],
        }).then(dataDone =>{
            let idArr = data.map(val => val.id);
            console.log(idArr);
            res.render('./dapur/dapur.ejs', {idArr:idArr,data:data,dataDone:dataDone})
        })
    })
})

router.get('/minuman',(req,res) => {
    models.PesananMenu.findAll({
        attributes:['id','quantity','keterangan','PesananId','status'],
        include:[
            {
                model: models.Pesanan,
                where:{
                    status:'On Process'
                }
             },{
                 model: models.Menu,
                 where: {
                     jenis:'minuman'
                 }
             }
         ],
         where:{
             status:false
         },
         order:[['createdAt','ASC']],
    }).then(data =>{
        // res.send(data)
        models.PesananMenu.findAll({
            attributes:['id','quantity','keterangan','PesananId','status'],
            include:[
                {
                    model: models.Pesanan,
                    where:{
                        status:'On Process'
                    }
                 },{
                     model: models.Menu,
                     where: {
                         jenis:'minuman'
                     }
                 }
             ],
             where:{
                 status:true
             },
             order:[['createdAt','ASC']],
        }).then(dataDone =>{
            // res.send(dataDone)
            let idArr = data.map(val => val.id);
            console.log(idArr);
            res.render('./dapur/dapur.ejs', {idArr:idArr,data:data,dataDone:dataDone})
        })
    })
})

router.get('/:id/done', (req, res) =>{
    models.PesananMenu.findOne({
        where:{
            id:req.params.id
        }
    }).then(data => {
            // res.send(data);
            data.update({
                status: true
            }).then(()=>{
                res.redirect('/dapur')
            });
        });
    // models.PesananMenu.update({
    //     status: true
    // },{ where: { id: req.params.id }
    // }).then(() =>{
    //     res.redirect('/dapur')
    // })
})


module.exports = router;
