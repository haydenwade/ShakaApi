var jwt = require('jwt-simple');

var auth = {
    login: function(req, res) {
      var username = req.body.username || '';
      var password = req.body.password || '';

      if (username == '' || password == '') {
        res.status(401);
        res.json({
          "status": 401,
          "message": "Invalid credentials"
        });
        return;
      }
      if(username === 'jon' && password === 'test'){
        res.json({
          token : genToken(username),
          message : 'login success'
        });
      } else{
        res.status(401);
        res.json({
          status : 401,
          message : 'Invalid credentials!!'
        });
      }
    }
  }
// Private Methods
  function genToken(user) {
    var expires = expiresIn(7); // 7 days
    var token = jwt.encode({
      exp: expires,
      user: user
    }, require('../middlewares/secret.js')());
    return {
      token: token,
      expires: expires,
      user: user
    };
  }

  function expiresIn(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
  }
  module.exports = auth;
