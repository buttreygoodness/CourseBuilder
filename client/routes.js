// Adding routes to the application

Meteor.Router.add({
  '/': 'home',
  '/courses/:id': function(id) {
    Session.set('currentCourse', id);
    return 'course';
  },
  '/courses/:id/preview': function(id) {
    Session.set('currentCourse', id);
    return 'preview';
  },
  '*': 'home'
});

Meteor.Router.filters({
  'checkLoggedIn': function(page) {
    if (Meteor.loggingIn()) {
      return 'loading';
    } else if (Meteor.user()) {
      return page;
    } else {
      return 'home';
    }
  }
});

// Applies to all pages

Meteor.Router.filter('checkLoggedIn');