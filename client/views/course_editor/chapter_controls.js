// chapterControls template

Template.chapterControls.helpers({
  
  showEditChapterDialog: function () {
    return Session.get('showEditChapterDialog') && Session.get('selectedNode') === this._id;
  },
  
  showCreateSectionDialog: function () {
    return Session.get('showCreateSectionDialog') && Session.get('selectedNode') === this._id;
  },
  
  chapter: function () {
    return Modules.findOne(this._id);
  },
  
  selected: function () {
    return Session.get('selectedNode') === this._id;
  }
  
});

Template.chapterControls.events({
  
  'click .createSection': function (event, template) {
    Session.set('showEditChapterDialog', false);
    Session.set('showCreateSectionDialog', true);
    return false;
  },
  
  'click .editChapter': function (event, template) {
    Session.set('showEditChapterDialog', true);
    return false;
  },
  
  'click .removeChapter': function (event, template) {
    event.preventDefault();
    var confirmation = confirm("Are you sure you want to delete this element?");
    if (confirmation === true) {
      Meteor.call('removeNode', this._id);
    } else {
      return false;
    }
  }
  
});