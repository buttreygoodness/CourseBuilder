// createSectionDialogInline template

Template.createSectionDialogInline.rendered = function () {
  $(this.find('.title')).focus();
}

Template.createSectionDialogInline.events({
  
  'click .cancel': function (event, template) {
    event.preventDefault();
    Session.set('showCreateSectionDialog', false);
  },
  
  'click .save': function (event, template) {
    event.preventDefault();
    var title = template.find('.title').value;
    // var body = template.find('.body').value;
    var parent = Session.get('selectedNode') || Session.get('currentManual');
    
    if (title.length) {
      Meteor.call('createSection', {
        title: title,
        // body: body,
        parentId: parent
      }, function (error, section){
        if (! error) {
          Session.set('selectedNode', null);
          Session.set('showCreateSectionDialog', false);
        } else {
          console.log(error);
        }
      });
    }
  }
  
});

// editChapterDialogInline template

updateThisSection = function (event, template, id) {
  var title = template.find('.title').value;
  
  console.log('updateThisSection', title);
  
  if (title.length) {
    Meteor.call('updateSection', {
      title: title,
      _id: id
    }, function (error, section) {
      if (! error) {
        Session.set('selectedNode', null);
        Session.set('showEditChapterDialog', null);
      }
    });
  }
}

Template.editSectionDialogInline.rendered = function () {
  $(this.find('.title')).focus();
}

Template.editSectionDialogInline.events({
  'click .cancel': function (event, template) {
    event.preventDefault();
    Session.set('selectedNode', null);
    Session.set('showEditSectionDialog', null);
    return false;
  },
  
  'click .save': function (event, template) {
    event.preventDefault();
    updateThisSection(event, template, this._id);
  },
  
  'keypress .title': function (event, template) {
    // press return
    if (event.which === 13) {
      updateThisSection(event, template, this._id);
    }
  },
  
  'keydown .title': function (event, template) {
    // press escape
    if (event.which === 27) {
      Session.set('showEditSectionDialog', null);
      Session.set('selectedNode', null);
      return false;
    }
  }
  
});