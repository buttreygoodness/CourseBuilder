Template.home.greeting = "CourseBuilder";

Template.home.created = function () {
  Session.set('errorMessage', null);
  Session.set('currentManual', null);
}

Template.home.helpers({
  anyManuals: function () {
    return Manuals.find().count() > 0;
  },
  
  courses: function () {
    return Manuals.find();
  },
  
  showCreateCourseDialog: function () {
    return Session.get('showCreateCourseDialog');
  }
});

Template.home.events({
  'click #createCourseButton': function (event, template){
    //Session.set('showCreateCourseDialog', true);
    $('#createCourseModal').modal();
  },
  
  'click .removeCourse': function (event, template) {
    var confirmation = confirm("Are you sure you want to delete this course?");
    if (confirmation === true) {
      Modules.remove(this._id);
    } else {
      return false;
    }
  },
  
  'click .cancel': function (event, template) {
    //Session.set('showCreateCourseDialog', false);
    $('#createCourseModal').modal('hide');
  },
  
  'click #saveCreateCourse': function (event, template) {
    var title = template.find('.title').value;
    var description = template.find('.description').value;
    
    if (title.length) {
      $('#createCourseModal').modal('hide');
      
      Meteor.call('createManual', {
        title: title,
        description: description
      }, function (error, course) {
        if (error) {
          console.error(error.message);
        } else {
          // Session.set('showCreateCourseDialog', false);
          Meteor.Router.to( '/courses/' + course );
        }
      });
    } else {
      $('#createCourseError').text('Title is necessary.').show();
    }
  }
});