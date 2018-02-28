const express = require('express');
const router = express.Router();
const models = require('../models')

router.get('/', (req, res)=>{
    res.render('./dapur/dapur.ejs')
    // res.send('dapur nih')
})


module.exports = router;

