Meteor.startup(function () {
  if (!Meteor.users.find().count()) {
    var options = {
      username: 'admin',
      password: 'password',
      email: 'admin@example.com'
    }
    
    var user_id = Accounts.createUser(options);
    
    if (!Manuals.find().count()) {
      var options = {
        owner: user_id,
        title: 'Default Test Course',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      };
      
      var course = Manuals.insert(options);
      
      var chapters = [
        {
          parentId: course,
          owner: user_id,
          module_type: 'am_chapter',
          title: 'Chapter One'
        },
        
        {
          parentId: course,
          owner: user_id,
          module_type: 'am_chapter',
          title: 'Chapter Two'
        },
        
        {
          parentId: course,
          owner: user_id,
          module_type: 'am_chapter',
          title: 'Chapter Three'
        }
      ];
      
      var sections = [
        {
          parentId: '',
          owner: user_id,
          module_type: 'am_section',
          title: 'Section One'
        },
        
        {
          parentId: '',
          owner: user_id,
          module_type: 'am_section',
          title: 'Section Two'
        },
        
        {
          parentId: '',
          owner: user_id,
          module_type: 'am_section',
          title: 'Section Three'
        }
      ];
      
      var block = [
        {
          parentId: '',
          owner: user_id,
          module_type: 'am_block',
          body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }
      ];
      
      _.each(chapters, function (chapter) {
        var chap = Modules.insert(chapter);
        _.each(sections, function (section) {
          section.parentId = chap;
          var tmp_title = chapter.title + ": " + section.title;
          var sec = Modules.insert(section, function (err, section) {
            Modules.update(section, { $set: { title: tmp_title } });
          });
          _(_.random(2,5)).times(function (n) {
            var block = {
              parentId: sec,
              owner: user_id,
              module_type: 'am_block',
              body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
            };
            
            Modules.insert(block);
          });
        });
      });
    }
  }
});