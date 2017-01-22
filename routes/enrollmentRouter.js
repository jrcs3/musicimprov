var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var Enrollments = require('../models/enrollments');
var Verify = require('./verify');

var enrollmentListRouter = express.Router();


enrollmentListRouter.route('/register/:courseId/:userId')
.put(function(req, res, next) {
    var findParms = {'course_id': req.params.courseId, 'user_id':req.params.userId};
    
    Enrollments.find(findParms)
        .exec(function(err, enrollment) {
            if (err) next(err);

            if (enrollment.length === 0) {
                var newEnrollment = { 
                    course_id: findParms.course_id, 
                    user_id: findParms.user_id,
                    is_active: true,
                    is_premium: false
                };
                Enrollments.create(newEnrollment, function (err, lesson) {
                    if (err) next(err);
                    console.log('Enrollment created!');
                    var id = lesson.id;

                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    });
                
                    res.end('Added the Enrollment with id: ' + id);
                });
            } else {
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    });
                
                    res.end('Already exists with id: ' + enrollment[0]._id);
            }
            //res.json({success: false});
    //         if (err) next(err);
    //         res.json(enrollment);
    });
})
;

module.exports = enrollmentListRouter;