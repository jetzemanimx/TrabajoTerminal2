var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
        Escuela:{
        	type: String,
        	required: false,
        	default: 'Escuela Superior de Cómputo' 
        }},
        FacebookUrl : String,
        Date:{
        	type: Date, 
        	default: Date.now()
        }
});
module.exports = mongoose.model('Votante',votanteSchema);