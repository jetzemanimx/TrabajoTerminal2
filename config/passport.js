var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = require('../app/models/User');

passport.use(new LocalStrategy({
        usernameField: 'RFC',
        passwordField: 'Password'
    },
    function(username, password, done) {
        User.findOne({ 'personalData.RFC': username }, function (err, user) {
            if (err) { return done(err); }
            // Return if user not found in database
            if (!user) {
                return done(null, false, {
                    message: 'Usuario no encontrado'
                });
            }
            // Return if password is wrong
            if (!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Password incorrecto'
                });
            }
            // If credentials are correct, return the user object
            return done(null, user);
        });
    }
));