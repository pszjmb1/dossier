/**
 * Template helpers for Dossier media
 */
var positionCounter = 1;

Template.media.helpers({
  media: function() {
      currentCrisis = Crises.findOne(Session.get('currentCrisisId'));
      return currentCrisis.media;
      //return Media.find();
  }
});