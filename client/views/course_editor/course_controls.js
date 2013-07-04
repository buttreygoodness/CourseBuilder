// courseControls template

Template.courseControls.events({
  
  'click .createChapter': function (event, template) {
    event.preventDefault();
    Session.set('showCreateChapterDialog', true);
  },
  
  'click .createSection': function (event, template) {
    event.preventDefault();
    Session.set('showCreateSectionDialog', true);
  },
  
  'click .createBlock': function (event, template) {
    event.preventDefault();
    Session.set('showCreateBlockDialog', true);
  },
  
  'click .edit': function (event, template) {
    event.preventDefault();
    Session.set('showEditCourseDialog', true);
  }
  
});