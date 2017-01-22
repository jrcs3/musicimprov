var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/users');
var Verify = require('./verify');

/* GET users listing. */
//router.get('/', Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
router.get('/', Verify.verifyOrdinaryUser, function(req, res, next) {
//router.get('/', function(req, res, next) {
    User.find({}, function (err, user) {
        if (err) next(err);
        res.json(user);
    });
});

router.route('/:userId')
.get(function(req, res, next) {
    User.findById(req.params.userId)
        .exec(function (err, user) {
            if (err) next (err);
            res.json(user);
        });
})
;


router.post('/register', function(req, res) {
    console.log(req.body.username);
    User.register(new User({ username : req.body.username }),
                 req.body.password, function (err, user) {
        if (err) {
            return res.status(500).json({err: err});
        }
        
        if (req.body.firstname) {
            user.firstname = req.body.firstname;
        }
        if (req.body.lastname) {
            user.lastname = req.body.lastname;
        }
        
        user.save(function (err, user) {        
            passport.authenticate('local')(req, res, function() {
                return res.status(200).json({status: 'Registration Successful!'});
            });
        });
    });
});

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);            
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function (err) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    err: 'Could not login user!!!'
                });
            }
            var token = Verify.getToken({ 
                "username": user.username,
                "_id": user._id,
                "admin": user.admin
            });
            res.status(200).json({
                status: 'Login successful!',
                success: true,
                admin: user.admin,
                token: token
            });
        });
    })(req, res, next);
});

router.get('/logout', function (req, res) {
    req.logout();
    res.status(200).json({
        status: 'Bye'
    });
});

router.get('/facebook', passport.authenticate('facebook'),
          function (req, res){});

router.get('/facebook/callback', function (req, res, next) {
    passport.authenticate('facebook', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            } 
            var token = Verify.getToken({ 
                "username": user.username,
                "_id": user._id,
                "admin": user.admin
            });
            res.status(200).json({
                status: 'Login successful',
                success: true,
                token: token
            });
        });
    })(req, res, next);
});

module.exports = router;
