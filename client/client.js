Meteor.subscribe('courses');

Meteor.startup(function () {
  
  // Configure accounts to use username and email
  
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
  });
  
  Deps.autorun(function () {

  });
});

// Adding routes to the application

Meteor.Router.add({
  '/': 'home',
  '/dashboard': 'dashboard',
  '/courses/:id': function(id) {
    Session.set('currentCourse', id);
    return 'course';
  }
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