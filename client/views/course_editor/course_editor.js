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

Template.course.rendered = function () {
  $('.sidebar').affix();

  var elem = $(this.find('#sidebarAccordion'));
  elem.sortable({
    revert: 100,
    update: function(event, ui) {
      // build a new array items in the right order, and push them 
      var chapters = $(event.target).children('.toc_chapter');
      _.each(chapters, function(element, index, list) {
        var id = $(element).data('id');
        Modules.update({_id: id}, {$set: {listposition: index}});
      });
    }
  });
}

Template.course.helpers({
  
  manual: function () {
    return Manuals.findOne({_id: Session.get('currentManual')});
  },
  
  anyChapters: function () {
    var chapters = Modules.find({ parentId: Session.get('currentManual'), module_type: 'am_chapter' });
    return chapters.count() > 0;
  },
  
  chapters: function () {
    return Modules.find({ parentId: Session.get('currentManual'), module_type: 'am_chapter' }, {sort: {listposition: 1}});
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
  },
  
  getStarted: function () {
    var chapter_count = Modules.find({ parentId: Session.get('currentManual'), module_type: 'am_chapter' }).count();
    if (chapter_count > 0) {
      return false;
    }
    
    return !Session.get('showCreateChapterDialog');
  }
  
});

