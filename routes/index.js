const express = require('express');
const router = express.Router();
const models = require('../models');
const checkLogin = require('../helpers/checkLogin');
const bcrypt = require('bcrypt');
const saltRounds = 10;


router.get('/', (req, res) => {
    console.log(req.session)
    if(req.session.user){
        res.redirect('/home');
    }
    else{
        res.render('index');
    }
});

router.get('/signup', (req,res) => {
    let err = req.query;
    res.render('signup',{err:err});
});

router.post('/signup', (req,res) => {
    models.User.findAll({
        where:{
            username:req.body.username
        }
    }).then(users => {
        if(users.length>0){
            let err = new Error("User sudah terdaftar! Login atau gunakan username lain!");
            res.redirect(`/signup?err=${err.message}`);
        }
        else{
            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                let newUser = {
                    username:req.body.username,
                    password:hash
                }
                models.User.create(newUser)
                    .then(()=> {
                    req.session.user = newUser;
                    res.redirect('/home');
                });
            });
        }
    })
})


router.get('/login', (req,res) => {
    let err = req.query;
    res.render('login',{err:err});
})


router.post('/login', (req,res) => {
    // res.send(req.session)
    models.User.findOne({
        where:{
            username:req.body.username
        }
    }).then((user) => {
        if(user){
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if(result){
                    req.session.user = {username:user.username, password:user.password}
                    res.redirect('/home');
                }
                else{
                    let err = new Error('Password yang anda masukkan salah');
                    res.redirect(`/login?err=${err.message}`)
                }
            });
            // if(user.password != req.body.password){
            //     let err = new Error('Password yang anda masukkan salah');
            //     res.redirect(`/login?err=${err.message}`)
            // }
            // else{
            //     req.session.user = {username:user.username, password:user.password}
            //     res.redirect('/home');
            // }
        }
        else{
            let err = new Error('Username belum terdaftar! Sign Up terlebih dahulu!')
            res.redirect(`/login?err=${err.message}`);
        }
    })
})

router.get('/logout', (req,res) => {
    req.session.destroy(() => {
        console.log("User logged out");
        res.redirect('/');
    })
})

router.get('/home',checkLogin,(req,res) => {
    console.log(req.session)
    res.render('home',{username:req.session.user.username});
});







module.exports = router;
