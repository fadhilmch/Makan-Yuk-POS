const express = require('express');
const router = express.Router();
const models = require('../models')

router.get('/', (req, res)=>{
    res.render('./kasir/kasir.ejs')
    // res.send('kasir nih')
})


module.exports = router;

