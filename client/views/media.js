/**
 * Template helpers for Dossier media
 */

 Template.media.helpers({
  media: function() {
    currentCrisis = Crises.findOne(Session.get('currentCrisisId'));     
    return currentCrisis.media.sort(function(a,b){ return a.order - b.order})
  }
});

 Template.media.rendered = function() {
  $( "#sortable" ).sortable({ cursor: "move", delay: 50, opacity: 0.5,
    revert: 125, scroll: true,
    update: function( event, ui ) {
      currentCrisis = Crises.findOne(Session.get('currentCrisisId'));
      i=0;
      var media = new Array();
      $( "#sortable" ).children().each(function (){
        media.push({order: i++, resource: this.id});
      });
      Crises.update( {_id: currentCrisis._id}, { $set: {'media': media}});
    }
  });
  $( "#sortable" ).disableSelection();
};

/**
 * Attach events to keydown, keyup, and blur on "New media" input box.
 */
 Template.media.events(okCancelEvents(
  '#new-media',
  {
    ok: function (text, evt) {
      currentCrisis = Crises.findOne(Session.get('currentCrisisId'));
      // Add item to Media if one not already added
      //To do automatically generate the corret media type
      var count = Media.find({resource: text}).count()
      if (count === 0)
        Media.insert({resource: text, mediatype: 'image/jpeg'});

      // Add item to currentCrisis.media, if not already there
      //Crises.update({_id: currentCrisis._id}, { $addToSet: { media: text } 
      i=0;
      var media = new Array();
      media.push({order: i++, resource: text});
      $( "#sortable" ).children().each(function (){
        media.push({order: i++, resource: this.id});
      });
      Crises.update( {_id: currentCrisis._id}, { $set: {'media': media}});

      evt.target.value = "";
    }
  }));

