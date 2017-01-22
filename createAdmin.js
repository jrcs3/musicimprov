var mongoose = require('mongoose');
var express = require('express');

mongoose.Promise = global.Promise;


var passport = require('passport');
var authenticate = require('./authenticate');
//var Promise = require('promise');

var connectionString = process.env.MONGODB_URI || 'mongodb://localhost/MusicalImprov';

mongoose.connect(connectionString);

app = express();

app.use(passport.initialize());

var User = require('./models/users');
console.log('Before register')
User.register(new User({ username : 'admin' }),
                'password', function (err, user) {
    console.log('After register')
    if (err) {
        console.log('ERROR:');
        console.log(err);
        return 0;
    }
    
    user.firstname = 'Admin';
    user.lastname = 'User';
    user.admin = true;
    
    user.save(function (err, user) {        
        console.log('Admin Created!')
        return 1;
    });
});
