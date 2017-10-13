const mongoose = require('mongoose');//因为nodejs 和 chrome／web 端支持的 javascript的版本不一样，所以一个是import一个是require
const Schema=mongoose.Schema;//tell mongoose a field that our model is going to have
const bcrypt = require('bcrypt-nodejs');
//define model
const userSchema = new Schema({//创建2个property
    email: {type:String,unique:true},
    password: String
})
//on save hook, encrypt password
//before saving a model, run this function
userSchema.pre('save',function(next){
    //get access to the user model,then can use user.password, user.email
    const user=this;
    //generate a salt then run callback
    bcrypt.genSalt(10,function(err,salt){
        if(err){return next(err);}

        //hash(encrypt) our password using the salt
        bcrypt.hash(user.password,salt,null,function(err,hash){
            if (err) {
               return next(err); 
            }
            //overwrite plain text password with encrypted password
            user.password=hash;
            //go ahead and save the model
            next();
        })
    })
})

userSchema.methods.comparePassword = function(candidatePassword,callback){//userschema里面创建一个instance method 是 comparePassword
    bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
        if(err){
            return callback(err);
        }
        callback(null,isMatch); 
    })

}
//create model class
const ModelClass=mongoose.model('user',userSchema);//所有的user

//export model
module.exports = ModelClass;
