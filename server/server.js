Meteor.publish('modules', function () {
  return Modules.find({ owner: this.userId });
});

Meteor.publish('manuals', function () {
  return Manuals.find({ owner: this.userId });
});