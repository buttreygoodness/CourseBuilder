// course template

Template.course.created = function () {
  Session.set('selectedNode', null);
  Session.set('showCreateChapterDialog', null);
  Session.set('showEditChapterDialog', null);
  Session.set('showCreateSectionDialog', null);
  Session.set('showEditSectionDialog', null);
  Session.set('showCreateBlockDialog', null);
  Session.set('showEditBlockDialog', null);
  Session.set('showEditCourseDialog', null);
}

Template.course.helpers({
  
  course: function () {
    return Modules.findOne({_id: Session.get('currentCourse')});
  },
  
  anyChapters: function () {
    var chapters = Modules.find({ parentId: Session.get('currentCourse'), module_type: 'am_chapter' });
    return chapters.count() > 0;
  },
  
  chapters: function () {
    return Modules.find({ parentId: Session.get('currentCourse'), module_type: 'am_chapter' });
  },
  
  anySections: function (i, e) {
    var secs = Modules.find({ parentId: this._id, module_type: 'am_section' });
    return secs.count() > 0;
  },
  
  sections: function () {
    return Modules.find({ parentId: this._id, module_type: 'am_section' });
  },
  
  showCreateChapterDialog: function () {
    return Session.get('showCreateChapterDialog') && Session.get('selectedNode') === null;
  },
  
  showCreateSectionDialog: function () {
    return Session.get('showCreateSectionDialog') && Session.get('selectedNode') === null;
  },
  
  showCreateBlockDialog: function () {
    return Session.get('showCreateBlockDialog') && Session.get('selectedNode') === null;
  },
  
  showEditCourseDialog: function () {
    return Session.get('showEditCourseDialog') && Session.get('selectedNode') === null;
  }
  
});

Template.course.events({
  'click h1': function (event, template) {
    Session.set('selectedNode', null);
  }
});