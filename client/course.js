// course template

Template.course.created = function () {
  Session.set('selectedNode', null);
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

// chapterControls template

Template.chapterControls.events({
  'click .createSection': function (event, template) {
    console.log('chapterControls createSection');
    Session.set('showCreateSectionDialog', true);
  }
});

// courseControls template

Template.courseControls.events({
  
  'click .createChapter': function (event, template) {
    Session.set('showCreateChapterDialog', true);
  },
  
  'click .createSection': function (event, template) {
    Session.set('showCreateSectionDialog', true);
  }
  
});

// sectionControls template

Template.sectionControls.events({
  
  'click .createBlock': function (event, template) {
    Session.set('showCreateBlockDialog', true);
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
  },
  
  // 'mouseleave h2': function (event, template) {
  //   Session.set('selectedNode', null);
  // }
  
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
    Session.set('selectedNode', this._id);
  },

  // 'mouseleave h3': function (event, template) {
  //   Session.set('selectedNode', null);
  // }
  
});

// createChapterDialogInline template

Template.createChapterDialogInline.events({
  
  'click .cancel': function (event, template) {
    Session.set('showCreateChapterDialog', false);
  },
  
  'click .save': function (event, template) {
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

// createChapterDialog template

Template.createChapterDialog.events({
  
  'click .cancel': function (event, template) {
    Session.set('showCreateChapterDialog', false);
  },
  
  'click .save': function (event, template) {
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

// createSectionDialog template

Template.createSectionDialog.events({
  
  'click .cancel': function (event, template) {
    Session.set('showCreateSectionDialog', false);
  },
  
  'click .save': function (event, template) {
    var title = template.find('.title').value;
    var parent = Session.get('selectedNode') || Session.get('currentCourse');
    
    if (title.length) {
      Meteor.call('createSection', {
        title: title,
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

// createSectionDialog template

Template.createBlockDialog.events({
  
  'click .cancel': function (event, template) {
    Session.set('showCreateBlockDialog', false);
  },
  
  'click .save': function (event, template) {
    var title = template.find('.title').value;
    var body = template.find('.body').value;
    var parent = Session.get('selectedNode');
    
    if (body.length) {
      Meteor.call('createBlock', {
        title: title,
        body: body,
        parentId: parent
      }, function (error, block){
        if (! error) {
          Session.set('selectedNode', block);
          Session.set('showCreateBlockDialog', false);
        } else {
          console.log(error);
        }
      });
    }
  }
  
});