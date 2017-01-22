var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var Lessons = require('../models/lessons');
var Courses = require('../models/courses');
var Verify = require('./verify');

var lessonRouter = express.Router();

lessonRouter.route('/')
.get(function(req, res, next) {
    Lessons.find({})
        .exec(function(err, lesson) {
            if (err) next(err);
            res.json(lesson);
        });
})
.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Lessons.create(req.body, function (err, lesson) {
        if (err) next(err);
        console.log('Lesson created!');
        var id = lesson.id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the lesson with id: ' + id);
    });
})
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Lessons.remove({}, function(err, resp) {
        if (err) next(err);
        res.json(resp);
    });
})
;

lessonRouter.route('/:lessonId')
.get(function(req, res, next) {
    Lessons.findById(req.params.lessonId)
        .exec(function (err, lesson) {
            if (err) next (err);
            res.json(lesson);
        });
})
.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Lessons.findByIdAndUpdate(req.params.lessonId, {
        $set: req.body
    }, {
        new: true
    }, function (err, lesson) {
        if (err) next(err);
        res.json(lesson);
    });
})
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Lessons.findByIdAndRemove(req.params.lessonId, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
})
;

module.exports = lessonRouter;