/**
 * Template helpers for Majority Report narratives
 */

 Template.narrative.helpers({
  naremes: function() {
    currentCrisis = Crises.findOne(Session.get('currentCrisisId'));     
    return currentCrisis.narrative.narremes;
  }
});