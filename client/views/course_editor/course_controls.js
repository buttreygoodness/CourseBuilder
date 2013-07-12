// courseControls template

Template.courseControls.events({
  
  'click .createChapter': function (event, template) {
    Session.set('selectedNode', null);
    Session.set('showCreateChapterDialog', true);
    return false;
  },
  
  'click .createSection': function (event, template) {
    Session.set('selectedNode', null);
    Session.set('showCreateSectionDialog', true);
    return false;
  },
  
  'click .createBlock': function (event, template) {
    Session.set('selectedNode', null);
    Session.set('showCreateBlockDialog', true);
    return false;
  },
  
  'click .edit': function (event, template) {
    Session.set('selectedNode', null);
    Session.set('showEditCourseDialog', true);
    return false;
  }
  
});