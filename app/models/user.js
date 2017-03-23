var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var jwt = require('jsonwebtoken');
var crypto = require('crypto');

var userSchema = new mongoose.Schema({
        personalData:{
        RFC: {
            type: String,
            unique: true,
            required: true
        },
        userType: {
            type: String,
            required: false,
            default: 'Admin'
        },
        Sex: {
            type: String,
            required: true
        },
        Name: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        Email: {
            type: String,
            required: true,
            unique:true
        },
        Address: {
            type: String,
            required: false,
            default: 'Juan de dios Bátiz, Nueva Industrial Vallejo, Ciudad de México, D.F.'
        },
        Telephone: {
            type: String,
            required: false,
            default: '01 55 5729 6000'
        }/*,
        Password: {
            type: String,
            required: true
        }*/},
        FacebookUrl : String,
        hash: String,
        salt: String,
        Date:{
            type: Date, 
            default: Date.now()
        },
        isActive: {
            type: Boolean,
            default: true
        }
});

userSchema.methods.setPassword = function(password){
    if(password){
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto.pbkdf2Sync(password,this.salt,1000,64).toString('hex');
    }
};

userSchema.methods.validPassword = function(password){
    var hash = crypto.pbkdf2Sync(password,this.salt,1000,64).toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJwt = function(){
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({
        _id: this._id,
        RFC : this.personalData.RFC,
        Name : this.personalData.Name,
        lastName : this.personalData.lastName,
        Email : this.personalData.Email,
        userType : this.personalData.userType,
        exp: parseInt(expiry.getTime() / 1000)
    },"MY_SECRET");
};

module.exports = mongoose.model('User',userSchema);