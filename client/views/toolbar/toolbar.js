Template.toolbar.helpers({
  currentManual: function () {
    return Session.get('currentManual');
  },
  
  manual: function () {
    return Manuals.findOne(Session.get('currentManual'));
  }
})