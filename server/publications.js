/**
 * Dossier server publication rules
 */

/**
 * For now publish all Crises info
 */
Meteor.publish('crises', function() {
  return Crises.find();
});