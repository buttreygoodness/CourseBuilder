// course template

Template.course.helpers({
  course: function () {
    return Courses.findOne({_id: Session.get('currentCourse')});
  },
  
  anyChapters: function () {
    var chapters = Modules.find({ parentId: Session.get('currentCourse'), module_type: 'am_chapter' });
    return chapters.count() > 0;
  },
  
  chapters: function () {
    return Modules.find({
      parentId: Session.get('currentCourse')
    });
  },
  
  selectedChapter: function (i, e) {
    return this._id == Session.get('selectedChapter');
  },
  
  showCreateChapterDialog: function () {
    return Session.get('showCreateChapterDialog');
  }
});

// courseControls template

Template.courseControls.events({
  'click .createChapter': function (event, template) {
    Session.set('showCreateChapterDialog', true);
  }
});

Template.course.events({
  'click .chapter': function (event, template) {
    $('.selected').removeClass('selected');
    $(template.find('.' + this._id)).addClass('selected');
    Session.set('selectedChapter', this._id);
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