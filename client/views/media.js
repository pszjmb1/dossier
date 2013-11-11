/**
 * Template helpers for Dossier media
 */

Template.media.helpers({
  currentCrisis: function() {    
    return Crises.findOne(Session.get('currentCrisisId'));  
  }, 
  media: function() {
      currentCrisis = Crises.findOne(Session.get('currentCrisisId'));
      return currentCrisis.media;
  }
});