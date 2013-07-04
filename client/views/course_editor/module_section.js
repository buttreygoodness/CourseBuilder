// module_section template

Template.module_section.helpers({
  selected: function () {
    return Session.get('selectedNode') === this._id;
  },
  
  anyBlocks: function () {
    var secs = Modules.find({ parentId: this._id, module_type: 'am_block' });
    return secs.count() > 0;
  },
  
  blocks: function () {
    return Modules.find({ parentId: this._id, module_type: 'am_block' });
  }
  
});

Template.module_section.events({
  
  'click': function (event, template) {
    event.preventDefault();
    Session.set('selectedNode', this._id);
  }

});