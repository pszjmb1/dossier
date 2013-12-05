/**
 * Template helpers for a Dossier medium
 */

/**
 *  Returns a resource from a Media object if it can find one.
 */
 function getResource(context){
  item = Media.findOne({resource:""+context.resource});
  if(item){
    return item.resource;
  } else{
    return null;
  }
}

/**
 *  Returns a mediatype from a Media object if it can find one.
 */
 function getMediatype(context){
  item = Media.findOne({resource:""+context.resource});
  if(item){
    return item.mediatype;
  } else{
    return null;
  }
}

/**
 * Returns the resource from the corresponding Media object to "this"
 */
 Template.medium.resource = function () {
  return getResource(this);
};

/**
 * Returns the short description attribute of the "this" medium
 */
 Template.medium.shortdesc = function () {
  item = Media.findOne({resource:""+this.resource});
  if(item){
    //console.log(item.attributes);
    var res = $.grep(item.attributes, function(e){return e.shortdesc});
    //If there is one or multiple short descriptions, use the first one
    if(res[0]){
      return res[0].shortdesc;
    }
  }
  return "Add description";
};


Template.medium.events({
  'click #showAttribsBtn': function() {
    console.log('here');
    $("#showAttribsBtn").append('<div id="dialog" title="Basic dialog"> <p>This is the default dialog which is useful for displaying information. The dialog window can be moved, resized and closed with the x icon.</p></div>');
    $( "#dialog" ).dialog();
  }
});

Template.medium.helpers({
  imageSrc: function() {
    mediatype = getMediatype(this);
    if (mediatype == 'image/jpeg' || mediatype == 'image/png'){
      return mediatype;
    }
  },
  videoSrc: function() {
    mediatype = getMediatype(this);
    if (mediatype == 'video/fla'){
     return mediatype;
   }
 },
 textSrc: function() {
  mediatype = getMediatype(this);
  if (mediatype == 'html/txt'){
   return mediatype;
 }
}
});



