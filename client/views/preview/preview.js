Template.preview.helpers({
  currentCourse: function () {
    return Session.get('currentCourse');
  },
  
  course: function () {
    return Modules.findOne(Session.get('currentCourse'));
  },
  
  chapters: function () {
    return Modules.find({ parentId: Session.get('currentCourse') });
  },
  
  sections: function () {
    return Modules.find({ parentId: this._id });
  },
  
  blocks: function () {
    return Modules.find({ parentId: this._id });
  }
  
});
