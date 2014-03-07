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
    console.log(e.latlng);
    return Markers.insert({
      latlng: e.latlng
    });
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