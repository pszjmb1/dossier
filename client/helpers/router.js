/**
 * Meteor routing rules for basic router. 
 * Todo: replace with IronRouter
 */

Meteor.Router.add({
  '/': 'home',
  '/crisis/:_id': {
    to: 'crisisMedia',
    and: function(id) { Session.set('currentCrisisId', id); }  
  }
});