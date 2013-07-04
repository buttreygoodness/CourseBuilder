Template.block_text.helpers({
  
  selected: function () {
    return Session.get('selectedNode') === this._id;
  },
  
  showEditBlockDialog : function () {
    return Session.get('showEditBlockDialog') && Session.get('selectedNode') === this._id;
  }
  
});

Template.block_text.events({
  
  'click': function (event, template) {
    event.preventDefault();
    Session.set('selectedNode', this._id);
  }
  
});