// Block Collection

Meteor.methods({
  
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
    
  }
});