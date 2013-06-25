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
    
    // console.log('createChapter', options);
    
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
    
  },
  
  updateChapter: function (options) {
    
    console.log('updateChapter', options);
    
    check(options, {
      title: String,
      _id: String
    });
    
    return Modules.update(options._id, {$set: {title: options.title}});
    
  },
  
  createSection: function (options) {
    
    // console.log('createSection', options);
    
    check(options, {
      title: String,
      body: String,
      parentId: String
    });
    
    return Modules.insert({
      parentId: options.parentId,
      owner: this.userId,
      module_type: 'am_section',
      title: options.title,
      body: options.body
    });
    
  },
  
  updateSection: function (options) {
    
    // console.log('updateSection', options);
    
    check(options, {
      title: String,
      body: String,
      _id: String
    });
    
    return Modules.update(options._id, {$set: 
      {
        title: options.title,
        body: options.body
      }
    });
    
  },
  
  createBlock: function (options) {
    
    // console.log('createBlock', options);
    
    check(options, {
      title: String,
      parentId: String,
      body: String
    });

    return Modules.insert({
      parentId: options.parentId,
      owner: this.userId,
      module_type: 'am_block',
      title: options.title,
      body: options.body
    });
    
  },
  
  updateBlock: function (options) {
    
    // console.log('updateBlock', options);
    
    check(options, {
      title: String,
      body: String,
      _id: String
    });
    
    return Modules.update(options._id, {$set: {title: options.title, body: options.body}});
    
  },
  
  removeNode: function (id) {
    return Modules.remove(id);
  }
  
});
