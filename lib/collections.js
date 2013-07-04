Modules = new Meteor.Collection('modules');

Meteor.methods({
  
  removeNode: function (id) {
    return Modules.remove(id);
  }
  
});
