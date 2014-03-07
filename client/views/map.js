// Based on github.com/bevanhunt/meteor-leaflet-demo
Meteor.subscribe('markers')
Meteor.subscribe('horz_majrep_app_properties')

// resize the layout
window.resize = function(t){
  var w = window.innerWidth
  var h = window.innerHeight
  t.find('#mapcontainer').style.width = "#{w}px"
  t.find('#map').style.height = "#{h}px"
};

Template.map.helpers({
  mapApiKey: function(){
    settings = HORZ_MAJREP_Properties.findOne({userId: {$in: [this.userId, 'Default']}});
    if(!settings.mapapiKey){
      return false;
    } else{
      return true;
    }
  }
});

// Attach events to keydown, keyup, and blur on "New crisis" input box.
Template.map.events(okCancelEvents(
  '#mapApi',
  {
    ok: function (text, evt) {
      settings = HORZ_MAJREP_Properties.findOne({userId: {$in: [this.userId, 'Default']}});
      HORZ_MAJREP_Properties.update( {_id: settings._id}, { $set: {'mapapiKey': text}});
      evt.target.value = "";
      Meteor.Router.to('/');
    }
  }));
  
Template.map.rendered = function() {
  // resize on load
  window.resize(this);

  // resize on resize of window
  $(window).resize((function(_this) {
    return function() {
      return window.resize(_this);
    };
  })(this));
  // create default image path
  L.Icon.Default.imagePath = '../packages/leaflet/images';

  settings = HORZ_MAJREP_Properties.findOne({userId: {$in: [this.userId, 'Default']}});
  if(!settings.mapapiKey){
    return 'Please enter a map api key. You can get one from http://cloudmade.com.' ;
  }

  // create a map in the map div, set the view to a given place and zoom
  window.map = L.map('map', {
    doubleClickZoom: false
  }).setView([settings.mapOriginLat, settings.mapOriginLon], settings.mapOriginLevel); 

  // add a CloudMade tile layer
  L.tileLayer.provider(settings.mapProvider, {
    apiKey: settings.mapapiKey,
    styleID: settings.mapStyle, 
    attribution: settings.mapAttribution
  }).addTo(window.map);

  // click on the map and will insert the latlng into the markers collection 
   window.map.on('dblclick', function(e) {
    var marker = Markers.insert({
      latlng: e.latlng
    }); 
    Session.set('marker-id', marker);

    var templateName = "mapAttributes";
    var fragment = Meteor.render( function() {
      return Template[ templateName ](); 
    });
    $("#showAttribsBtn").append('<div id="dialog" title="Assign Location to Item"></div>');
    $( "#dialog" ).dialog({width: 600, height: 600}).append(fragment);

    return marker
  });

  // watch the markers collection
  var query = Markers.find();
  return query.observe({
    added: function(mark) {
      var marker;

      return marker = L.marker(mark.latlng).addTo(window.map).on('click', function(e) {
        var remove_id;
        remove_id = Markers.findOne({
          latlng: this._latlng
        })._id;
        return Markers.remove({
          _id: remove_id
        });
      });
    },
    removed: function(mark) {
      var key, layers, val, _results;
      layers = window.map._layers;
      _results = [];
      for (key in layers) {
        val = layers[key];
        if (!val._latlng) {

        } else {
          if (val._latlng.lat === mark.latlng.lat && val._latlng.lng === mark.latlng.lng) {
            _results.push(window.map.removeLayer(val));
          } else {
            _results.push(void 0);
          }
        }
      }
      return _results;
    }
  });
};



Template.mapAttributes.helpers({
  currentCrisis: function() {
    return Crises.findOne(Session.get('currentCrisisId'));
  },
  existMedia: function(){
    var viewtype = Session.get('markerSelectView');
    if(viewtype == 'existMedia'){
      return viewtype;
    } else{
      return false;
    }
  },
  existNarreme: function(){
    var viewtype = Session.get('markerSelectView');
    if(viewtype == 'existNarreme'){
      return viewtype;
    } else{
      return false;
    }
  }
});

 Template.mapAttributes.events({
  'click :radio': function(event, template) {
    var element = template.find('input:radio[name=marker_choice]:checked');
    Session.set('markerSelectView', $(element).val());
  }
});
 Template.mediaList.helpers({
  media: function() {
    currentCrisis = Crises.findOne(Session.get('currentCrisisId'));     
    return currentCrisis.dossier.media.sort(function(a,b){ return a.order - b.order})
  }
});

Template.mediumOption.helpers({
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
 Template.mediumOption.resource = function () {
  return getResource(this);
};

/**
 * Returns the short description attribute of the "this" medium
 */
 Template.mediumOption.shortdesc = function () {
  item = Media.findOne({resource:""+this.resource});
  if(item && item.attributes){
    //console.log(item.attributes);
    var res = $.grep(item.attributes, function(e){return e.shortdesc});
    //If there is one or multiple short descriptions, use the first one
    if(res[0]){
      return res[0].shortdesc;
    }
  }
};

Template.mediaList.events({
  'submit form': function(e) {
    e.preventDefault();
    $('.ui-state-default :checked').each(function() {
      var resource = $(this).val();    
      var pushModifier = { $push: {} };
      pushModifier.$push = {attributes: {}};
      pushModifier.$push.attributes['marker-id']=Session.get('marker-id');
      res = Media.findOne({'resource': resource});
      Media.update( {_id: res._id}, pushModifier);
    });
  }
});