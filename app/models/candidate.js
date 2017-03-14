var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var candidateSchema = new mongoose.Schema({
	personalData:{
        RFC: {
            type: String,
            unique: true,
            required: true
        },
        userType: {
            type: String,
            required: false,
            default: 'Candidate'
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
        Address: {
            type: String,
            required: false,
            default: 'Juan de dios Bátiz, Nueva Industrial Vallejo, Ciudad de México, D.F.'
        },
        Telephone: {
            type: String,
            required: false,
            default: '01 55 5729 6000'
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
        }
        
});
module.exports = mongoose.model('Candidate',candidateSchema);