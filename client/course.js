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

var resetDialogs = function () {
  Session.set('showCreateChapterDialog', null);
  Session.set('showCreateSectionDialog', null);
  Session.set('showCreateBlockDialog', null);
}

Template.course.helpers({
  
  course: function () {
    return Courses.findOne({_id: Session.get('currentCourse')});
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
    return Session.get('showCreateChapterDialog');
  },
  
  showCreateSectionDialog: function () {
    return Session.get('showCreateSectionDialog');
  },
  
  showCreateBlockDialog: function () {
    return Session.get('showCreateBlockDialog');
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

Template.toc_chapter.helpers({
  
  anySections: function () {
    var secs = Modules.find({ parentId: this._id, module_type: 'am_section' });
    return secs.count() > 0;
  },
  
  sections: function () {
    return Modules.find({ parentId: this._id, module_type: 'am_section' });
  }
  
});

// courseControls template

Template.courseControls.events({
  
  'click .createChapter': function (event, template) {
    event.preventDefault();
    Session.set('showCreateChapterDialog', true);
  },
  
  'click .createSection': function (event, template) {
    event.preventDefault();
    Session.set('showCreateSectionDialog', true);
  },
  
  'click .createBlock': function (event, template) {
    event.preventDefault();
    Session.set('showCreateBlockDialog', true);
  },
  
  'click .edit': function (event, template) {
    event.preventDefault();
    Session.set('showEditCourseDialog', true);
  }
  
});

// chapterControls template

Template.chapterControls.helpers({
  
  showEditChapterDialog: function () {
    return Session.get('showEditChapterDialog') && Session.get('selectedNode') === this._id;
  },
  
  showCreateSectionDialog: function () {
    return Session.get('showCreateSectionDialog') && Session.get('selectedNode') === this._id;
  },
  
  chapter: function () {
    return Modules.findOne(this._id);
  },
  
  selected: function () {
    return Session.get('selectedNode') === this._id;
  }
  
});

Template.chapterControls.events({
  
  'click .createSection': function (event, template) {
    event.preventDefault();
    Session.set('showEditChapterDialog', false);
    Session.set('showCreateSectionDialog', true);
  },
  
  'click .editChapter': function (event, template) {
    event.preventDefault();
    console.log('chapterControls.editChapter');
    Session.set('showEditChapterDialog', true);
  },
  
  'click .removeChapter': function (event, template) {
    event.preventDefault();
    var confirmation = confirm("Are you sure you want to delete this element?");
    if (confirmation === true) {
      Meteor.call('removeNode', this._id);
    } else {
      return false;
    }
  }
  
});

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

var deselectAll = function () {
  $('.selected').removeClass('selected');
}

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
  }
  
});

// editChapterDialogInline template

Template.editChapterDialogInline.events({
  'click .cancel': function (event, template) {
    event.preventDefault();
    Session.set('showEditChapterDialog', null);
  },
  
  'click .save': function (event, template) {
    event.preventDefault();
    var title = template.find('.title').value;
    
    if (title.length) {
      Meteor.call('updateChapter', {
        title: title,
        _id: this._id
      }, function (error, chapter) {
        if (! error) {
          Session.set('selectedNode', chapter);
          Session.set('showEditChapterDialog', null);
        }
      });
    }
  }
});

// createChapterDialogInline template

Template.createChapterDialogInline.events({
  
  'click .cancel': function (event, template) {
    event.preventDefault();
    Session.set('showCreateChapterDialog', false);
  },
  
  'click .save': function (event, template) {
    event.preventDefault();
    var title = template.find('.title').value;
    
    if (title.length) {
      Meteor.call('createChapter', {
        title: title,
        parentId: Session.get('currentCourse')
      }, function (error, chapter){
        if (! error) {
          Session.set('selectedNode', chapter);
          Session.set('showCreateChapterDialog', false);
        } else {
          console.log(error);
        }
      });
    }
  }
  
});

// createSectionDialogInline template

Template.createSectionDialogInline.events({
  
  'click .cancel': function (event, template) {
    event.preventDefault();
    Session.set('showCreateSectionDialog', false);
  },
  
  'click .save': function (event, template) {
    event.preventDefault();
    var title = template.find('.title').value;
    var body = template.find('.body').value;
    var parent = Session.get('selectedNode') || Session.get('currentCourse');
    
    if (title.length) {
      Meteor.call('createSection', {
        title: title,
        body: body,
        parentId: parent
      }, function (error, section){
        if (! error) {
          Session.set('selectedNode', section);
          Session.set('showCreateSectionDialog', false);
        } else {
          console.log(error);
        }
      });
    }
  }
  
});

// editChapterDialogInline template

Template.editSectionDialogInline.events({
  'click .cancel': function (event, template) {
    event.preventDefault();
    Session.set('showEditSectionDialog', null);
  },
  
  'click .save': function (event, template) {
    event.preventDefault();
    var title = template.find('.title').value;
    var body = template.find('.body').value;
    
    if (title.length) {
      Meteor.call('updateSection', {
        title: title,
        body: body,
        _id: this._id
      }, function (error, section) {
        if (! error) {
          Session.set('selectedNode', section);
          Session.set('showEditSectionDialog', null);
        }
      });
    }
  }
});

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

// editBlockDialogInline template

Template.editCourseDialogInline.events({
  
  'click .cancel': function (event, template) {
    event.preventDefault();
    Session.set('showEditCourseDialog', false);
  },
  
  'click .save': function (event, template) {
    event.preventDefault();
    var title = template.find('.title').value;
    var description = template.find('.description').value;
    var course_id = Session.get('currentCourse');
    
    if (title.length) {
      Meteor.call('updateCourse', {
        title: title,
        description: description,
        _id: this._id
      }, function (error, course){
        if (! error) {
          Session.set('showEditCourseDialog', false);
        } else {
          console.log(error);
        }
      });
    }
  }
  
});
