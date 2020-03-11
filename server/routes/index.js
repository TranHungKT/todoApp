const express = require('express');
const router = express.Router();

router.get('/', (req,res)=> {
    res.render('welcome')
    reqes.send('welcome')    
})
;

module.exports = router;