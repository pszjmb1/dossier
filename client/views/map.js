// Based on github.com/bevanhunt/meteor-leaflet-demo
Meteor.subscribe('markers')

// resize the layout
window.resize = function(t){
  var w = window.innerWidth
  var h = window.innerHeight
  t.find('#mapcontainer').style.width = "#{w}px"
  t.find('#map').style.height = "#{h}px"
};
  
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

  // create a map in the map div, set the view to a given place and zoom
  window.map = L.map('map', {
    doubleClickZoom: false
  }).setView([52.95195397175029, -1.1837467644363642], 13);

  // add a CloudMade tile layer with style #997
  L.tileLayer.provider('CloudMade', {
    apiKey: 'ccb330aa97f84031b4489de329ca8da3',
    styleID: '997',
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
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