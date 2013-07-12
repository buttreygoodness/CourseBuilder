// createBlockDialogInline template

Template.createBlockDialogInline.rendered = function () {
  this.find('.title').focus();
}

Template.createBlockDialogInline.events({
  
  'click .cancel': function (event, template) {
    event.preventDefault();
    Session.set('showCreateBlockDialog', false);
  },
  
  'click .save': function (event, template) {
    event.preventDefault();
    var title = template.find('.title').value;
    var body = template.find('.body').value;
    var parent = Session.get('selectedNode') || Session.get('currentCourse');
    
    if (body.length) {
      Meteor.call('createBlock', {
        title: title,
        body: body,
        parentId: parent
      }, function (error, section){
        if (! error) {
          Session.set('selectedNode', section);
          Session.set('showCreateBlockDialog', false);
        } else {
          console.log(error);
        }
      });
    }
  }
  
});

// editBlockDialogInline template

Template.editBlockDialogInline.rendered = function () {
  var editor = this.find('#editor');
  $(editor).wysiwyg().focus();
  
  // Example configuration for the editor
  // See https://github.com/mindmup/bootstrap-wysiwyg/
  
  /*
  function initToolbarBootstrapBindings() {
    var fonts = ['Serif', 'Sans', 'Arial', 'Arial Black', 'Courier', 
    'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times',
    'Times New Roman', 'Verdana'];

    fontTarget = $('[title=Font]').siblings('.dropdown-menu');

    $.each(fonts, function (idx, fontName) {
      fontTarget.append($('<li><a data-edit="fontName ' + fontName +'" style="font-family:\''+ fontName +'\'">'+fontName + '</a></li>'));
    });

    $('a[title]').tooltip({container:'body'});

    $('.dropdown-menu input').click(function() {return false;})
      .change(function () {
        $(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');
      })
      .keydown('esc', function () {this.value='';$(this).change();});

    $('[data-role=magic-overlay]').each(function () { 
      var overlay = $(this), target = $(overlay.data('target')); 
      overlay.css('opacity', 0).css('position', 'absolute').offset(target.offset()).width(target.outerWidth()).height(target.outerHeight());
    });

    if ("onwebkitspeechchange"  in document.createElement("input")) {
      var editorOffset = $('#editor').offset();
      $('#voiceBtn').css('position','absolute').offset({top: editorOffset.top, left: editorOffset.left+$('#editor').innerWidth()-35});
    } else {
      $('#voiceBtn').hide();
    }
  };
  */
}

Template.editBlockDialogInline.events({
  
  'click .cancel': function (event, template) {
    event.preventDefault();
    event.stopImmediatePropagation();
    
    Session.set('selectedNode', null);
    Session.set('showEditBlockDialog', false);
  },
  
  'click .save': function (event, template) {
    event.preventDefault();
    
    // var title = template.find('.title').value;
    var body = template.find('#editor').innerHTML;
    
    if (body.length) {
      Meteor.call('updateBlock', {
        // title: title,
        body: body,
        _id: this._id
      }, function (error, section){
        if (! error) {
          Session.set('selectedNode', section);
          Session.set('showEditBlockDialog', false);
        } else {
          console.log(error);
        }
      });
    }
  },
  
  // 'blur': function (event, template) {
  //   event.preventDefault();
  //   Session.set('selectedNode', null);
  //   Session.set('showEditBlockDialog', false);
  // }
  
});