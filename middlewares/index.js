var jwt = require('jwt-simple');
var moment = require('moment');

exports.ensureAuthenticated = function(req, res, next) {
  if(!req.headers.authorization) {
    return res
      .status(401)
      .jsonp({message: "You request haven't a token"});
  }

  var token = req.headers.authorization.split(" ")[1];
  var payload = jwt.decode(token, 'tokenultrasecreto');

  if(payload.exp <= moment().unix()) {
     return res
        .status(401)
        .jsonp({message: "The token has expired"});
  }  

  req.user = payload.sub;
  req.admin = payload.admin;
  next();
};

exports.isAdmin = function(req, res, next) {
  var isAdmin = req.admin;

  if (!isAdmin){
    return res.status(403).jsonp({message: "You are not an admin"});
  }

  next();
}
