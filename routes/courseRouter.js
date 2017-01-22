var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var Courses = require('../models/courses');
var Verify = require('./verify');

var courseRouter = express.Router();

courseRouter.route('/')
.get(function(req, res, next) {
    Courses.find({})
        .exec(function(err, course) {
            if (err) next(err);
            res.json(course);
        });
})
.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Courses.create(req.body, function (err, course) {
        if (err) next(err);
        console.log('Course created!');
        var id = course.id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the course with id: ' + id);
    });
})
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Courses.remove({}, function(err, resp) {
        if (err) next(err);
        res.json(resp);
    });
})
;

courseRouter.route('/:courseId')
.get(function(req, res, next) {
    Courses.findById(req.params.courseId)
        .exec(function (err, course) {
            if (err) next (err);
            res.json(course);
        });
})
.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Courses.findByIdAndUpdate(req.params.courseId, {
        $set: req.body
    }, {
        new: true
    }, function (err, course) {
        if (err) next(err);
        res.json(course);
    });
})
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Courses.findByIdAndRemove(req.params.courseId, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
})

;

module.exports = courseRouter;