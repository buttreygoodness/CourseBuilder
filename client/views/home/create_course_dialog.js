Template.createCourseDialog.events({
  'click .cancel': function (event, template) {
    Session.set('showCreateCourseDialog', false);
  },
  
  'click .save': function (event, template) {
    var title = template.find('.title').value;
    var description = template.find('.description').value;
    
    if (title.length) {
      Meteor.call('createCourse', {
        title: title,
        description: description
      }, function (error, course) {
        if (error) {
          console.error(error.message);
        } else {
          Session.set('showCreateCourseDialog', false);
          Meteor.Router.to( '/courses/' + course );
        }
      });
    } else {
      console.log('Both title and description are necessary.');
    }
  }
});