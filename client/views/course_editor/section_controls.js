// sectionControls template

Template.sectionControls.helpers({
  
  showEditSectionDialog: function () {
    return Session.get('showEditSectionDialog') && Session.get('selectedNode') === this._id;
  },
  
  showCreateBlockDialog: function () {
    return Session.get('showCreateBlockDialog') && Session.get('selectedNode') === this._id;
  },
  
  section: function () {
    return Modules.findOne(this._id);
  },
  
  selected: function () {
    return Session.get('selectedNode') === this._id;
  }
  
});

Template.sectionControls.events({
  
  'click .createBlock': function (event, template) {
    event.preventDefault();
    Session.set('showCreateBlockDialog', true);
  },
  
  'click .editSection': function (event, template) {
    event.preventDefault();
    Session.set('showEditSectionDialog', true);
    console.log('sectionControls.editSection');
  },
  
  'click .removeSection': function (event, template) {
    event.preventDefault();
    var confirmation = confirm("Are you sure you want to delete this element?");
    if (confirmation === true) {
      Meteor.call('removeNode', this._id);
    } else {
      return false;
    }
  }
  
});