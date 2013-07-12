// Section Collection

Meteor.methods({

  createSection: function (options) {
    
    // console.log('createSection', options);
    
    check(options, {
      title: String,
      // body: String,
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
      // body: String,
      _id: String
    });
    
    return Modules.update(options._id, {$set: 
      {
        title: options.title
        // body: options.body
      }
    });
    
  }
});