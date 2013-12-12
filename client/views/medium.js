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
  if(item && item.attributes){
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
    Session.set('currentMediaItemId', this.resource);
    var path = this.resource.split("/");
    var resname = path[path.length - 1];
    // this returns the HTML for the attributes template.
    var templateName = "attributes";
    var fragment = Meteor.render( function() {
      return Template[ templateName ](); 
    });

    var tableHead = '<table class="attrib-table"><thead><tr><th>Type</th><th>Value</th></tr></thead>';

    $("#showAttribsBtn").append('<div id="dialog" title="' + resname + '"></div>');// + tableHead + '</table></div>');
    $( "#dialog" ).dialog().append(fragment);
  }
});

/** Attributes **/


Template.attributes.helpers({
  attributes: function() {
    return Media.findOne({resource:""+ 
      Session.get('currentMediaItemId') }).attributes;
  }
});


Template.attribute.type = function () {
  return Object.getOwnPropertyNames(this)[0];
};


Template.attribute.value = function () {
  return this[Object.getOwnPropertyNames(this)[0]];
  //return this.key;
};

 Template.attributes.events({
   'click #new-attrib-submit': function(e) {
    e.preventDefault();
    var medium  = Media.findOne({resource:""+ 
      Session.get('currentMediaItemId') });

    var type = $('#new-attrib-type').val();
    var val = $('#new-attrib-value').val();
    var pushModifier = { $push: {} };
    pushModifier.$push = {attributes: {}};
    pushModifier.$push.attributes[''+type]=val;
    var out =Media.update( {_id: medium._id}, pushModifier);
   }
 });
/** End Attributes **/


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



