Meteor.subscribe('manuals');
Meteor.subscribe('modules');

Meteor.startup(function () {
  
  // Configure accounts to use username and email
  
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
  });
  
  Deps.autorun(function () {

  });
});

