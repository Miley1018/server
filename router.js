const authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport =require('passport');
const requireAuth = passport.authenticate('jwt',{session:false});
const requireSignin = passport.authenticate('local',{session:false});
module.exports = function(app){//不同的url,给不同的controller去处理
    app.get('/',requireAuth,function(req,res){
        res.send({hi:"there"});
    });
    app.post('/signup',authentication.signup);
    app.post('/signin',requireSignin, authentication.signin);//requireSignin,requireAuth都是middleware,before hit the router handler(signin/signup)
}