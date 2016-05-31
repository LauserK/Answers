var mongoose = require('mongoose');
var passwordHash = require('password-hash');
var service = require('../utils/services');

require('../models/user');
var User = mongoose.model('User');

exports.emailSignup = function(req, res, next) {  

  /* Detect if the values are empty */
  var email = req.body.email.toLowerCase();

  if (email == "") {
    return res
          .status(400)
          .jsonp({ message: {"email": "Email can't be empty"}})
  }
  else if (req.body.password == ""){
    return res
          .status(400)
          .jsonp({ message: {"password": "Password can't be empty"}})
  }
  else if (req.body.username == ""){
      return res
            .status(400)
            .jsonp({message: {"username": "Username can't be empty"}})
  }

  User.findOne({email: email}, function(err, existingEmail){
    //If exists and user with the email
    if (existingEmail) {
      return res
            .status(409)
            .jsonp({ message: { "email": 'Email is already taken.' }});
    } else {
        //If exists and user with Username
        User.findOne({username: req.body.username }, function(err, existingUsername){
            if (existingUsername){
                return res
                    .status(409)
                    .jsonp({ message: { "username": 'Username is already taken.' }});
            }
        });
    }
    
    //Create user
    var user = new User({
      email        : email,
      password     : passwordHash.generate(req.body.password),
      username     : req.body.username
    });

    user.save(function(err){
      if (err) return next(err);
      return res
          .status(200)
          .jsonp({
            token: service.createToken(user),
            user: user.username,           
          });
      });
  });
  
};

exports.emailLogin = function(req, res, next) {    

    /* Detect if the values are empty */
    var email = req.body.email.toLowerCase();
    var password = req.body.password;    

    if (email == "") {
      return res
            .status(400)
            .jsonp({ message: {"email": "Email can't be empty"}})
    }
    else if (password == ""){
      return res
            .status(400)
            .jsonp({ message: {"password": "Password can't be empty"}})
    }

    User.findOne({email: email}, function(err, user) {
      if(err) return next(err);
      // if not exist an user with the email
      if(!user) return res.status(401).jsonp({"message": { "email": 'Incorrect email' } })
      // if the password is correct
      if (!passwordHash.verify(password, user.password)){
        return res.status(401).jsonp({ "message": { "password": 'Incorrect password' } })
      }

      // Y si la contraseña es correcta
      return res
          .status(200)
          .jsonp({
            token: service.createToken(user),
            user: user.username
          });
    });
};
