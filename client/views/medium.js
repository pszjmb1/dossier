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

Template.medium.helpers({
  imageSrc: function() {
    mediatype = getMediatype(this);
    if (mediatype == 'image/jpeg' || mediatype == 'image/png' || mediatype == 'image/gif'){
      return mediatype;
    }
  },
  videoSrc: function() {
    mediatype = getMediatype(this);
    if (mediatype == 'video/fla' || mediatype == 'video/flv'){
     return mediatype;
   }
 },
  textSrc: function() {
    mediatype = getMediatype(this);
    if (mediatype == 'text/html'){
     return mediatype;
   }
 },
  audioSrc: function() {
    mediatype = getMediatype(this);
    if (mediatype == 'audio/mpeg' || mediatype == 'audio/ogg' || mediatype == 'audio/wav' ){
     return mediatype;
   }
 }
});



