// Chapter Collection

Meteor.methods({
  createChapter: function (options) {
    
    // console.log('createChapter', options);
    
    check(options, {
      title: String,
      parentId: String
    });
    
    var position = Modules.find({parentId: options.parentId}).count();
    console.log(position);
    
    return Modules.insert({
      parentId: options.parentId,
      owner: this.userId,
      module_type: 'am_chapter',
      title: options.title,
      listposition: position
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