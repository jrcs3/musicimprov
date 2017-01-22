var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var authenticate = require('./authenticate');

var connectionString = process.env.MONGODB_URI || 'mongodb://localhost/MusicalImprov';

console.log("my Info");
console.log(connectionString);
console.log(process.env.PORT);

mongoose.connect(connectionString);

app = express();

var LessonRouter = require('./routes/lessonRouter');
var LessonListRouter = require('./routes/lessonListRouter');
var UserRouter = require('./routes/userRouter');
var CourseRouter = require('./routes/courseRouter');
var EnrollmentRouter = require('./routes/enrollmentRouter');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(passport.initialize());

app.use(express.static(__dirname + '/public')); 
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/lessons', LessonRouter);  
app.use('/lessonList', LessonListRouter);  
app.use('/users', UserRouter);  
app.use('/courses', CourseRouter);  
app.use('/enrollment', EnrollmentRouter);  

var server = app.listen(process.env.PORT || 3000, function() {
   var port = server.address().port;
    console.log("App now running on port", port);
});