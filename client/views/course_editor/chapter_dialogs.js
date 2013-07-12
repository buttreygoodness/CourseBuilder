// createChapterDialogInline template

Template.createChapterDialogInline.rendered = function () {
  this.find('.title').focus();
}

Template.createChapterDialogInline.events({
  
  'click .cancel': function (event, template) {
    event.preventDefault();
    Session.set('showCreateChapterDialog', false);
  },
  
  'click .save': function (event, template) {
    event.preventDefault();
    var title = template.find('.title').value;
    
    if (title.length) {
      Meteor.call('createChapter', {
        title: title,
        parentId: Session.get('currentManual')
      }, function (error, chapter){
        if (! error) {
          Session.set('selectedNode', chapter);
          Session.set('showCreateChapterDialog', false);
        } else {
          console.log(error);
        }
      });
    }
  }
  
});

// editChapterDialogInline template

updateThisChapter = function (event, template, id) {
  var title = template.find('.title').value;
  
  if (title.length) {
    Meteor.call('updateChapter', {
      title: title,
      _id: id
    }, function (error, chapter) {
      if (! error) {
        Session.set('selectedNode', chapter);
        Session.set('showEditChapterDialog', null);
      }
    });
  }
}

Template.editChapterDialogInline.rendered = function () {
  this.find('.title').focus();
}

Template.editChapterDialogInline.events({
  'click .cancel': function (event, template) {
    Session.set('selectedNode', null);
    Session.set('showEditChapterDialog', null);
    return false;
  },
  
  'click .save': function (event, template) {
    event.preventDefault();
    updateThisChapter(event, template, this._id);
  },
  
  'keypress .title': function (event, template) {
    // press return
    if (event.which === 13) {
      updateThisChapter(event, template, this._id);
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