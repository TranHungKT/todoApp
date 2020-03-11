const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const app = express()



const db = require('./config/keys').MongoURI;

//connect to Mongo

mongoose.connect(db, {useNewUrlParser: true})
    .then(()=> console.log('MongoDB connected'))
    .catch((err) => console.log(err))




    app.use(bodyParser.json())


app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);
app.use(flash());
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });

app.use('/users',require('./routes/users'))
const PORT = process.env.PORT || 5000

const server = app.listen(PORT)
console.log(`Listening at http://localhost:${PORT}`)