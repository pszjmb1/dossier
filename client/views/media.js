/**
 * Template helpers for Dossier media
 */

 Template.media.helpers({
  media: function() {
    currentCrisis = Crises.findOne(Session.get('currentCrisisId'));     
    return currentCrisis.dossier.media.sort(function(a,b){ return a.order - b.order})
  }
});

 Template.media.rendered = function() {
  //$('.sortable').sortable();
  //{ cursor: "move", delay: 50, opacity: 0.5, revert: 125, scroll: true,
  $( ".sortable" ).sortable();
  $(".sortable" ).on('dragend.h5s', function(event){ 
    currentCrisis = Crises.findOne(Session.get('currentCrisisId'));
    i=0;
    var media = new Array();
    var firstId = 0;
    $( ".sortable" ).children().each(function (){
      if(this.id){
        media.push({order: i++, resource: this.id});
      }
    });
    Crises.update( 
      {_id: currentCrisis._id}, { $set: {'dossier.media': media}}, function(err, num){console.log(err);console.log(num);}
    );
  });
};

/**
 * Attach events to keydown, keyup, and blur on "New media" input box.
 */
 Template.media.events({
   'submit form': function(e) {
    e.preventDefault();
    currentCrisis = Crises.findOne(Session.get('currentCrisisId'));
    var issue = {
      media: $(e.target).find('[name=media]').val(),
      mediatype: $(e.target).find('[name=urgency]').val(),
    }


    Meteor.call('majreport', issue, function(error, id) {
      if (error)
        throwError(error.reason);

    });
      // Add item to Media if one not already added
      //To do automatically generate the corret media type
      var count = Media.find({resource:  $(e.target).find('[name=media]').val()}).count()
      if (count === 0)
        Media.insert({resource: $(e.target).find('[name=media]').val(), mediatype: $(e.target).find('[name=urgency]').val()});

      // Add item to currentCrisis.media, if not already there
      //Crises.update({_id: currentCrisis._id}, { $addToSet: { media: text } 
        i=0;
        var media = new Array();
        media.push({order: i++, resource: $(e.target).find('[name=media]').val()});
        $( "#sortable" ).children().each(function (){
          media.push({order: i++, resource: this.id});
        });
        Crises.update( {_id: currentCrisis._id}, { $set: {'dossier.media': media}});

        evt.target.value = "";
      }
    });

