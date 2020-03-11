const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
// const passport = require('passport');
// //Login page
router.get('/login', (req,res)=> {res.status(400)});

// //Register page
router.get('/register',(req,res)=> res.status(400));

router.post('/register',(req,res) => {
  const {username,password1,password2} = req.body;

  fail = false;

  if (!username || !password1||!password2) { 
    fail = true;
    return res.status(400).send('Please fill all fields');
  }
  
  if(password1 !== password2){ 
    fail = true; 
    return res.status(401).send('Password do not match');
  }

  if(password1.length < 6){
    fail = true;
    return res.status(400).send('Password should be at least 6 characters');
  }
  if(fail == false){
    User.findOne({username: username})
        .then(user => {
          if(user){
            fail = true
            return res.status(401).send('Username is registered');
          }else{
            const newUser = new User({
              username: username,
              password: password1
            });
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                  .save()
                  .then(user => {
                    req.flash(
                      'success_msg',
                      'You are now registered and can log in'
                    );
                    res.redirect('/users/login');
                  })
                  .catch(err => console.log(err));
              });
          });  
          return res.status(200).send()
      }
            
        }); 
  }
})


router.post('/login', (req, res) => {
    const {username, password} = req.body;
    fail = false;

    if(!username || !password){
      fail = true;
      return res.status(400).send('Please fill all fields');
    }
    

    if(fail == false){
      User.findOne({username:username})
          .then(user => {
            // console.log(user.password)
            console.log(password)
            
            if(user){
              bcrypt.compare(password,user.password,(err,isMatch) => {
                if(err) throw err;

                if(isMatch){
                  return res.status(200).send('OK')
                }else{
                  return res.status(400).send('Password incorrect')
                }
              })
            }else{
              return res.status(400).send('Cant find username ')
            }
          })
          .catch(err => {
            console.log(err);
          })

    }


    
  })
  













//Register handle
// router.post('/register',(req,res)=>{
//    const {name, email,password,password2} = req.body;
//    errors = []

//    //check required fields
//    if(!name || !email || !password || !password2){
//        errors.push({msg: 'Please fill all fields'});
//    }

//    //check passwords do not match
//    if(password2 !== password){
//        errors.push({msg: 'Passwords do not match'});
//    }

//    if(password.length < 6){
//        errors.push({msg: 'Password should be at least 6 characters'});
//    }

//    if (errors.length > 0){
//        res.render('register',{
//            errors,
//            name,
//            email,
//            password,
//            password2
//        })
//    }else{
//        User.findOne({email: email})
//             .then(user => {
//                 if(user){
//                     errors.push({msg: "Email is registed"});
//                     res.render('register',{
//                         errors,
//                         name,
//                         email,
//                         password,
//                         password2
//                     });
//                 }else{
//                     const newUser = new User({
//                         name,
//                         email,
//                         password
//                     });
//                     bcrypt.genSalt(10, (err, salt) => {
//                         bcrypt.hash(newUser.password, salt, (err, hash) => {
//                           if (err) throw err;
//                           newUser.password = hash;
//                           newUser
//                             .save()
//                             .then(user => {
//                               req.flash(
//                                 'success_msg',
//                                 'You are now registered and can log in'
//                               );
//                               res.redirect('/users/login');
//                             })
//                             .catch(err => console.log(err));
//                         });
//                     });    
//                 }
//             });
//    }
// })


// router.post('/login', (req, res, next) => {
//     passport.authenticate('local', {
//       successRedirect: '/dashboard',
//       failureRedirect: '/users/login',
//       failureFlash: true
//     })(req, res, next);
//   });



module.exports = router;