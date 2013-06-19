Template.course.helpers({
  course: function () {
    return Courses.findOne({_id: Session.get('currentCourse')});
  }
});