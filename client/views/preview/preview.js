Template.preview.created = function () {
  Session.set('previewMode', true);
}

Template.preview.rendered = function () {
  $('#table-of-contents').affix();
}

Template.preview.destroyed = function () {
  Session.set('previewMode', null);
}

Template.preview.helpers({
  currentCourse: function () {
    return Session.get('currentManual');
  },
  
  course: function () {
    return Manuals.findOne(Session.get('currentManual'));
  },
  
  chapters: function () {
    return Modules.find({ parentId: Session.get('currentManual') }, {sort: {listposition: 1}});
  },
  
  sections: function () {
    return Modules.find({ parentId: this._id });
  },
  
  blocks: function () {
    return Modules.find({ parentId: this._id });
  }
  
});
