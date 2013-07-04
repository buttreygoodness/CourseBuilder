Meteor.publish('modules', function () {
  return Modules.find({ owner: this.userId });
});