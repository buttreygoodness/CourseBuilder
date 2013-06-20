Template.toolbar.helpers({
  currentCourse: function () {
    return Session.get('currentCourse');
  },
  
  course: function () {
    return Courses.findOne(Session.get('currentCourse'));
  }
})