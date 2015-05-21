pref = function(drawnItems){
  var drawControl = new L.Control.Draw({
    position: 'topleft',
    draw: {
      polyline: false,
      rectangle: false,
      polygon: {
        allowIntersection: false,
        showArea: true,
        drawError: {
          color: '#b00b00',
          timeout: 1000
        },
        shapeOptions: {
          color: '#bada55'
        }
      },
      circle: {
        shapeOptions: {
          color: '#662d91'
        }
      },
      marker: false
    },
    edit: {
      featureGroup: drawnItems,
      remove: false
    }
  })

  return drawControl
};


(function($){
  var mlxUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    mlx = new L.TileLayer(mlxUrl, {maxZoom: 18}),
    map = new L.Map('map', {layers: [mlx], center: new L.LatLng(-37.7772, 175.2756), zoom: 15 });
  var drawnItems = new L.FeatureGroup(),
      drawControl = pref(drawnItems)
  map.addLayer(drawnItems);
  map.addControl(drawControl);

  map.on('draw:created', function (e) {
    var type = e.layerType,
      layer = e.layer;

    if (type === 'marker') {
      layer.bindPopup('A popup!');
    }
    console.log(e)
    if (type === "circle"){
      var lat = layer._latlng.lat,
          lng = layer._latlng.lng,
          radius = layer._mRadius
          console.log(e, lat + ", " + lng + ", " + radius)
    } else {
      var group = [],
          groups = []

      layer._latlngs.forEach(function forEach(ll){
        group.push('[' + ll.lat + ', ' + ll.lng + ']')
      })

      groups.push('{ "latLngs": [' + group.join(', ') + '] }')

      console.log("groups", groups)
      
      return groups
    }

    drawnItems.addLayer(layer);
  });

  map.on('draw:edited', function (e) {
    var layers = e.layers;
    var countOfEditedLayers = 0;
    layers.eachLayer(function(layer) {
      countOfEditedLayers++;
    });
  });
})(jQuery)