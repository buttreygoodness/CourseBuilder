// Adding routes to the application

Meteor.Router.add({
  '/': 'home',
  '/courses/:id': function(id) {
    if (Manuals.findOne(id)) {
      Session.set('currentManual', id);
      return 'course';
    } else {
      document.location.href = '/';
    }
  },
  '/courses/:id/preview': function(id) {
    Session.set('currentManual', id);
    return 'preview';
  },
  '/loading': 'loading',
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