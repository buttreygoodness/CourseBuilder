Meteor.publish('courses', function () {
  return Courses.find({owner: this.userId});
});