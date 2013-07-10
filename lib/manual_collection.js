Manuals = new Meteor.Collection('manuals');

Meteor.methods({
  
  removeManual: function (id) {
    return Manuals.remove(id);
  },
  
  createManual: function (options) {
    
    console.log('createManual', options);
    
    check(options, {
      title: String,
      description: String
    });
    
    return Manuals.insert({
      owner: this.userId,
      title: options.title,
      description: options.description
    });
  }
  
});