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
          dossier:{ media: [] }
        });
      evt.target.value = "";
      Meteor.Router.to('/crisis/' + id);
    }
  }));