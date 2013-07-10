// editCourseDialogInline template

Template.editCourseDialogInline.rendered = function () {
  this.find('.title').focus();
}

Template.editCourseDialogInline.events({
  
  'click .cancel': function (event, template) {
    event.preventDefault();
    Session.set('showEditCourseDialog', false);
  },
  
  'click .save': function (event, template) {
    event.preventDefault();
    var title = template.find('.title').value;
    var description = template.find('.description').value;
    var course_id = Session.get('currentManual');
    
    console.log(this._id);
    
    if (title.length) {
      Meteor.call('updateCourse', {
        title: title,
        description: description,
        _id: this._id
      }, function (error, course){
        if (! error) {
          Session.set('showEditCourseDialog', false);
        } else {
          console.log(error);
        }
      });
    }
  }
  
});
