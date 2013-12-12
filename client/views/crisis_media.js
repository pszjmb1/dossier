/**
 * Template helpers for Dossier crisis media
 */

Meteor.startup(function(){
  Session.set('reportview', 'media');
});

Template.crisisMedia.helpers({
  currentCrisis: function() {
    return Crises.findOne(Session.get('currentCrisisId'));
  },
  mediaview: function(){
    var viewtype = Session.get('reportview');
    if(viewtype == 'media'){
      return viewtype;
    } else{
      return false;
    }
  },
  narrativeview: function(){
    var viewtype = Session.get('reportview');
    if(viewtype == 'narrative'){
      return viewtype;
    } else{
      return false;
    }
  },
  mapview: function(){
    var viewtype = Session.get('reportview');
    if(viewtype == 'map'){
      return viewtype;
    } else{
      return false;
    }
  },
  timelineview: function(){
    var viewtype = Session.get('reportview');
    if(viewtype == 'timeline'){
      return viewtype;
    } else{
      return false;
    }
  }
});

 Template.crisisMedia.events({
  'click :radio': function(event, template) {
    var element = template.find('input:radio[name=reportview]:checked');
    Session.set('reportview', $(element).val());
  }
});