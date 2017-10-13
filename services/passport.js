const passport = require('passport');
const User = require('../models/user');
const config =require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//create local strategy
const localOptions = {userNameField:'email'};
const localLogin = new LocalStrategy(localOptions,function(email,password,done){
    User.findOne({email:email},function(err,user){
        if(err){return done(err);}
        if (!user){
            return done(null,false);
        }
        //compare passwords
        user.comparePassword(password,function(err,isMatch){
            if(err){return done(err);}
            if(!isMatch){
                return done(null,false);
            }
            return done(null,user);//返回req.user
        })
    })
});

//setup options for JWT strategy
const jwtOptions = {
    jwtFromRequest:ExtractJwt.fromHeader('authorization'),
    secretOrKey:config.secret
};

//create jwt strategy
const jwtLogin= new JwtStrategy(jwtOptions,function(payload,done){//payload 是 decoded token :eturn jwt.encode({sub:user.id,iat:timestamp},config.secret);
    User.findById(payload.sub,function(err,user){
        if(err){return done(err,false);}
        if(user){
            done(null,user);
        }else{
            done(null,false);
        }
    })
})

//tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);