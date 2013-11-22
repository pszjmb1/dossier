/**
 * Template helpers for Dossier media
 */


Template.media.helpers({
  media: function() {
     currentCrisis = Crises.findOne(Session.get('currentCrisisId'));
     
      return currentCrisis.media;
    


  }
});




 

// Attach events to keydown, keyup, and blur on "New media" input box.
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
      Crises.update({_id: currentCrisis._id}, { $addToSet: { media: text } });

      evt.target.value = "";
    }
  }));

