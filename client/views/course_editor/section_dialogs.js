// createSectionDialogInline template

Template.createSectionDialogInline.events({
  
  'click .cancel': function (event, template) {
    event.preventDefault();
    Session.set('showCreateSectionDialog', false);
  },
  
  'click .save': function (event, template) {
    event.preventDefault();
    var title = template.find('.title').value;
    var body = template.find('.body').value;
    var parent = Session.get('selectedNode') || Session.get('currentCourse');
    
    if (title.length) {
      Meteor.call('createSection', {
        title: title,
        body: body,
        parentId: parent
      }, function (error, section){
        if (! error) {
          Session.set('selectedNode', section);
          Session.set('showCreateSectionDialog', false);
        } else {
          console.log(error);
        }
      });
    }
  }
  
});

// editChapterDialogInline template

Template.editSectionDialogInline.events({
  'click .cancel': function (event, template) {
    event.preventDefault();
    Session.set('showEditSectionDialog', null);
  },
  
  'click .save': function (event, template) {
    event.preventDefault();
    var title = template.find('.title').value;
    var body = template.find('.body').value;
    
    if (title.length) {
      Meteor.call('updateSection', {
        title: title,
        body: body,
        _id: this._id
      }, function (error, section) {
        if (! error) {
          Session.set('selectedNode', section);
          Session.set('showEditSectionDialog', null);
        }
      });
    }
  }
});