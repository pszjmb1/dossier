/**
 * Template helpers for Dossier crises
 */

Template.crises.helpers({
  crises: function() {
      return Crises.find({}, {sort: {name: 1}});  
  }
});


// Attach events to keydown, keyup, and blur on "New crisis" input box.
Template.crises.events(okCancelEvents(
  '#new-crisis',
  {
    ok: function (text, evt) {
      var id = Crises.insert({
          name: text, 
          dossier:{ media: [], provenance:insertProv() }
        });
      evt.target.value = "";
      Meteor.Router.to('/crisis/' + id);
    }
  }));


/**
  * Convinience function for inserting provenance records into DB and returning their IDs
  */
  function insertProv(){
    return Provenance.insert({
            "entity": { // Map of entities by entities' IDs
          },
          "activity": { // Map of activities by IDs
          },
          "agent": { // Map of agents by IDs
          },
         // <relationName>: { // A map of relations of type relationName by their IDs
         // },
          //...
          "bundle": { // Map of named bundles by IDs
          }
        } );
  }

 
