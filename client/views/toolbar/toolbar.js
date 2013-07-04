Template.toolbar.helpers({
  currentCourse: function () {
    return Session.get('currentCourse');
  },
  
  course: function () {
    return Modules.findOne(Session.get('currentCourse'));
  }
})