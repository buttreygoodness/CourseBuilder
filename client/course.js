// course template

Template.course.helpers({
  course: function () {
    return Courses.findOne({_id: Session.get('currentCourse')});
  },
  
  anyChapters: function () {
    var chapters = Modules.find({ parentId: Session.get('currentCourse') });
    return chapters.count() > 0;
  },
  
  chapters: function () {
    return Modules.find({
      parentId: Session.get('currentCourse')
    });
  },
  
  showCreateChapterDialog: function () {
    return Session.get('showCreateChapterDialog');
  }
});

Template.course.events({
  'click .createChapter': function (event, template) {
    Session.set('showCreateChapterDialog', true);
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
          Session.set('showCreateChapterDialog', false);
        } else {
          console.log(error);
        }
      });
    }
  }
});