Template.home.greeting = "CourseBuilder";

Template.home.helpers({
  anyCourses: function () {
    return Modules.find({ parentId: { $exists: false } }).count() > 0;
  },
  
  courses: function () {
    return Modules.find({ parentId: { $exists: false } });
  },
  
  showCreateCourseDialog: function () {
    return Session.get('showCreateCourseDialog');
  }
});

Template.home.events({
  'click #createCourseButton': function (event, template){
    Session.set('showCreateCourseDialog', true);
  },
  
  'click .removeCourse': function (event, template) {
    var confirmation = confirm("Are you sure you want to delete this course?");
    if (confirmation === true) {
      Modules.remove(this._id);
    } else {
      return false;
    }
  }
});