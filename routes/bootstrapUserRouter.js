var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var express = require('express');

mongoose.Promise = global.Promise;


var User = require('../models/users');

// var passport = require('passport');
// var authenticate = require('./authenticate');
//var Promise = require('promise');

// var connectionString = process.env.MONGODB_URI || 'mongodb://localhost/MusicalImprov';

// mongoose.connect(connectionString);

// app = express();

// app.use(passport.initialize());

var courseRouter = express.Router();

courseRouter.route('/')
.put(function(req, res, next) {
    var findParms = {'username': 'admin'};
    console.log(findParms);
    User.find(findParms)
        .exec(function(err, enrollment) {
            if (err) next(err);

            if (enrollment.length === 0) {

                console.log('Before register')
                User.register(new User({ username : 'admin' }),
                                'password', function (err, user) {
                    console.log('After register')
                    if (err) {
                        console.log('ERROR:');
                        console.log(err);
                        next(err);
                    }
                    
                    user.firstname = 'Admin';
                    user.lastname = 'User';
                    user.admin = true;
                    
                    user.save(function (err, user) {
                        if (err) next(err);    
                        console.log('Admin Created!')
                        var id = user.id;

                        res.writeHead(200, {
                            'Content-Type': 'text/plain'
                        });
                    
                        res.end('Added the Admin User with id: ' + id);
                    });
                });
            } else {
                res.end('Admin User already exists');
            }
        })
});

module.exports = courseRouter;