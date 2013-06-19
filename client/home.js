Template.home.greeting = "CourseBuilder";

Template.home.helpers({
  anyCourses: function () {
    return Courses.find({owner: Meteor.userId()}).count() > 0;
  },
  
  courses: function () {
    return Courses.find({owner: Meteor.userId()});
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
    Courses.remove(this._id);
  }
});

Template.createCourseDialog.events({
  'click .cancel': function (event, template) {
    Session.set('showCreateCourseDialog', false);
  },
  
  'click .save': function (event, template) {
    var title = template.find('.title').value;
    var description = template.find('.description').value;
    
    if (title.length && description.length) {
      Meteor.call('createCourse', {
        title: title,
        description: description
      }, function (error, course) {
        if (error) {
          console.error(error.message);
        } else {
          Session.set('showCreateCourseDialog', false);
        }
      });
    } else {
      console.log('Both title and description are necessary.');
    }
  }
});
