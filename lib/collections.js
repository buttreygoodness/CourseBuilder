Courses = new Meteor.Collection('courses');

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
    
  }
})