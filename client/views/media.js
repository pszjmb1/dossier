/**
 * Template helpers for Dossier media
 */


Template.media.helpers({
  media: function() {
     currentCrisis = Crises.findOne(Session.get('currentCrisisId'));
     
      return currentCrisis.media;
    


  }
});



 
