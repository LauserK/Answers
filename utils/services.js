var jwt = require('jwt-simple');  
var moment = require('moment');  

exports.createToken = function(user) {  
  var payload = {
    sub        : user._id,
    iat        : moment().unix(),
    exp        : moment().add(14, "days").unix(),
    admin      : user.admin,
    username   : user.username
  };

  var token = jwt.encode(payload, 'tokenultrasecreto');

  return token;
};