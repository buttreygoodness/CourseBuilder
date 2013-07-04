// module_chapter template

Template.module_chapter.helpers({
  selected: function () {
    return Session.get('selectedNode') === this._id;
  },
  
  anySections: function () {
    var secs = Modules.find({ parentId: this._id, module_type: 'am_section' });
    return secs.count() > 0;
  },
  
  sections: function () {
    return Modules.find({ parentId: this._id, module_type: 'am_section' });
  }
  
});

Template.module_chapter.events({
  
  'click': function (event, template) {
    Session.set('selectedNode', this._id);
  }
  
});