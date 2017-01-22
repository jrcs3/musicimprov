var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EnrollmentSchema = new mongoose.Schema({
  course_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'Course'
  },
  user_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'User'
  },
  is_active: Boolean,
  is_premium: Boolean,
  updated_at: { 
    type: Date, 
    default: Date.now 
  }
});

var Enrollments = mongoose.model('Enrollment', EnrollmentSchema);


module.exports = Enrollments;