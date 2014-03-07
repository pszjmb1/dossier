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

/**
 * For now publish all Provenance info
 */
Meteor.publish('provenance', function() {
  return Provenance.find();
});


/**
 * For now publish all Markers info
 */
Meteor.publish('markers', function(){
  return Markers.find();
});


/**
 * For now publish all Application Properties info
 */
Meteor.publish('horz_majrep_app_properties', function(){
  return HORZ_MAJREP_Properties.find();
});