var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseSchema = new mongoose.Schema({
  name: String,
  description: String,
  start_date: Date,
  end_date: Date,
  is_active: Boolean,
  updated_at: { 
    type: Date, 
    default: Date.now 
  }
});

var Courses = mongoose.model('Course', CourseSchema);

module.exports = Courses;