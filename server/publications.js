/**
 * Dossier server publication rules
 */

/**
 * For now publish all Crises info
 */
Meteor.publish('crises', function() {
  return Crises.find();
});

/**
 * For now publish all Media info
 */
Meteor.publish('media', function() {
  return Media.find();
});