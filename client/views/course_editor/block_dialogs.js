// createBlockDialogInline template

Template.createBlockDialogInline.events({
  
  'click .cancel': function (event, template) {
    event.preventDefault();
    Session.set('showCreateBlockDialog', false);
  },
  
  'click .save': function (event, template) {
    event.preventDefault();
    var title = template.find('.title').value;
    var body = template.find('.body').value;
    var parent = Session.get('selectedNode') || Session.get('currentCourse');
    
    if (body.length) {
      Meteor.call('createBlock', {
        title: title,
        body: body,
        parentId: parent
      }, function (error, section){
        if (! error) {
          Session.set('selectedNode', section);
          Session.set('showCreateBlockDialog', false);
        } else {
          console.log(error);
        }
      });
    }
  }
  
});

// editBlockDialogInline template

Template.editBlockDialogInline.events({
  
  'click .cancel': function (event, template) {
    event.preventDefault();
    Session.set('showEditBlockDialog', false);
  },
  
  'click .save': function (event, template) {
    event.preventDefault();
    var title = template.find('.title').value;
    var body = template.find('.body').value;
    
    if (body.length) {
      Meteor.call('updateBlock', {
        title: title,
        body: body,
        _id: this._id
      }, function (error, section){
        if (! error) {
          Session.set('selectedNode', section);
          Session.set('showEditBlockDialog', false);
        } else {
          console.log(error);
        }
      });
    }
  }
  
});