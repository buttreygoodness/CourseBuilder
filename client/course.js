// course template

Template.course.created = function () {
  Session.set('selectedChapter', null);
  Session.set('showCreateChapterDialog', null);
  Session.set('showCreateSectionDialog', null);
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
  
  anySections: function () {
    var secs = Modules.find({ parentId: this._id, module_type: 'am_section' });
    return secs.count() > 0;
  },
  
  sections: function () {
    return Modules.find({ parentId: this._id, module_type: 'am_section' });
  },
  
  selectedChapter: function (i, e) {
    return this._id == Session.get('selectedChapter');
  },
  
  showCreateChapterDialog: function () {
    return Session.get('showCreateChapterDialog');
  },
  
  showCreateSectionDialog: function () {
    return Session.get('showCreateSectionDialog');
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

Template.course.events({
  
  'click .chapter': function (event, template) {
    $('.selected').removeClass('selected');
    $(template.find('.' + this._id)).addClass('selected');
    Session.set('selectedChapter', this._id);
  },
  
  'click .createSection': function (event, template) {
    Session.set('showCreateSectionDialog', true);
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
          Session.set('selectedChapter', chapter);
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
    var parent = Session.get('selectedChapter') || Session.get('currentCourse');
    
    if (title.length) {
      Meteor.call('createSection', {
        title: title,
        parentId: parent
      }, function (error, section){
        if (! error) {
          Session.set('selectedSection', section);
          Session.set('showCreateSectionDialog', false);
        } else {
          console.log(error);
        }
      });
    }
  }
  
});