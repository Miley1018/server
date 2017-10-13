const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user){
    const timestamp = new Date().getTime();
    //iat:issued at time
    return jwt.encode({sub:user.id,iat:timestamp},config.secret);//因为userid是一直不会变了，只要是同一个人，userid就是同一个//sub指jwt的property，subject of token is this user
}

exports.signin=function(req,res,next){
    res.send({token:tokenForUser(req.user)});
}
exports.signup=function(req,res,next){
    //req.body//是post有的所有内容
    const email = req.body.email;
    const password = req.body.password;

    if(!email||!password){
        return res.status(422).send({error:'You must provide email and password'});
    }
    User.findOne({email:email},function(err,existingUser){
        if(err){
            return next(err);
        }
        if(existingUser){
            return res.status(422).send({error:'Email is in use'});//express 自动把传过去的object转为json
        }
        const user = new User({email:email,password:password});
        user.save(function(err){
            if(err){return next(err);}
            res.json({token:tokenForUser(user)});
        });
    })
}