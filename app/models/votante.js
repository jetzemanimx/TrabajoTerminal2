var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var format = require('biguint-format');

var votanteSchema = new mongoose.Schema({
		personalData:{
        Boleta: {
            type: String,
            unique: true,
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
        Sex: {
            type: String,
            required: true
        },
        Email: {
            type: String,
            required: true,
            unique:true
        },
        Telephone : {
            type : String,
            required : false
        },
        Escuela:{
        	type: String,
        	required: false,
        	default: 'Escuela Superior de Cómputo' 
        }},
        FacebookUrl : String,
        Date:{
        	type: Date, 
        	default: Date.now()
        },
        isActive: {
            type: Boolean,
            default: true
        },
        authToken: String,
        resetTokenExpires: Date,
        verifiedToken: Boolean

});

votanteSchema.methods.generateJWT = function(bytesRandom) {
    return format(crypto.randomBytes(bytesRandom),'dec');
};



module.exports = mongoose.model('Votante',votanteSchema);