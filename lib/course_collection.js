// Course Collection

Meteor.methods({
  createCourse: function (options) {
    
    // console.log('createCourse', options);
    
    check(options, {
      title: String,
      description: String
    });
    
    return Manuals.insert({
      owner: this.userId,
      module_type: 'am_course',
      title: options.title,
      description: options.description
    });
  },
  
  updateCourse: function (options) {
    
    // console.log('updateCourse', options);
    
    check(options, {
      title: String,
      description: String,
      _id: String
    });
    
    return Manuals.update(options._id, {$set: {
      title: options.title,
      description: options.description
    }});
  }
});
