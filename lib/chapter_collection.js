// Chapter Collection

Meteor.methods({
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
    
  }
});