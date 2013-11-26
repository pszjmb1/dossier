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
      var id = Crises.insert({name: text});
      evt.target.value = "";
      //Todo set route to this id
    }
  }));