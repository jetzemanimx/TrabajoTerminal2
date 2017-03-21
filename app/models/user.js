var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
        },
        Password: {
            type: String,
            required: true
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
module.exports = mongoose.model('User',userSchema);