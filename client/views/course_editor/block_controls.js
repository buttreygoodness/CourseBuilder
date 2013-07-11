Template.blockControls.events({
  
  'click .editBlock': function (event, template) {
    event.preventDefault();
    Session.set('showEditBlockDialog', true);
  },
  
  'click .removeBlock': function (event, template) {
    event.preventDefault();
    var confirmation = confirm("Are you sure you want to delete this element?");
    if (confirmation === true) {
      Meteor.call('removeNode', this._id);
    } else {
      return false;
    }
  },
  
  'click .cancel': function (event, template) {
    event.preventDefault();
    event.stopImmediatePropagation();
    Session.set('selectedNode', null);
  }
  
});