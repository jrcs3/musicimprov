var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LessonSchema = new mongoose.Schema({
  //lesson_id: String,
  course_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'Course'
  },
  title: String,
  chapter_number: Number,
  is_premium: Boolean,
  sort_order: Number,
  text_description: String,
  text_content: String,
  updated_at: { 
    type: Date, 
    default: Date.now 
  }
});

var Lessons = mongoose.model('Lesson', LessonSchema);

module.exports = Lessons;