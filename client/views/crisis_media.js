/**
 * Template helpers for Dossier crisis media
 */

Template.crisisMedia.helpers({
  currentCrisis: function() {
    return Crises.findOne(Session.get('currentCrisisId'));
  }
});