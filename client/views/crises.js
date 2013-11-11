/**
 * Template helpers for Dossier crises
 */

Template.crises.helpers({
  crises: function() {
      return Crises.find();  
  }
});