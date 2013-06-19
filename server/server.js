Meteor.publish('courses', function () {
  return Courses.find({owner: this.userId});
});

Meteor.publish('modules', function () {
  console.log(this);
  return Modules.find({owner: this.userId});
});