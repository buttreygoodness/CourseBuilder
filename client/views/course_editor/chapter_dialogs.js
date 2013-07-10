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

Template.editChapterDialogInline.rendered = function () {
  this.find('.title').focus();
}

Template.editChapterDialogInline.events({
  'click .cancel': function (event, template) {
    event.preventDefault();
    Session.set('showEditChapterDialog', null);
  },
  
  'click .save': function (event, template) {
    event.preventDefault();
    var title = template.find('.title').value;
    
    console.log(this._id);
    
    if (title.length) {
      Meteor.call('updateChapter', {
        title: title,
        _id: this._id
      }, function (error, chapter) {
        if (! error) {
          Session.set('selectedNode', chapter);
          Session.set('showEditChapterDialog', null);
        }
      });
    }
  }
});