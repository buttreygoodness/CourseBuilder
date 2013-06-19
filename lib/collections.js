Courses = new Meteor.Collection('courses');
Modules = new Meteor.Collection('modules');

Meteor.methods({
  createCourse: function (options) {
    
    console.log('createCourse', options);
    
    check(options, {
      title: String,
      description: String
    });
    
    return Courses.insert({
      owner: this.userId,
      title: options.title,
      description: options.description
    });
  },
  
  createChapter: function (options) {
    
    console.log('createChapter', options);
    
    check(options, {
      title: String,
      parentId: String
    });
    
    return Modules.insert({
      parentId: options.parentId,
      owner: this.userId,
      module_type: 'am_chapter',
      title: options.title
    });
    
  }
})