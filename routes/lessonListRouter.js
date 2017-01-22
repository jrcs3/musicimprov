var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var Lessons = require('../models/lessons');
var Courses = require('../models/courses');
var Verify = require('./verify');

var lessonListRouter = express.Router();


lessonListRouter.route('/')
.get(function(req, res, next) {
    Lessons.find({})
        .populate('course_id')
        .exec(function(err, lesson) {
            if (err) next(err);
            res.json(lesson);
        });
})
;

module.exports = lessonListRouter;