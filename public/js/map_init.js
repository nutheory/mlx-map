(function (window, document, undefined){

  MLXMAP = {}

  MLXMAP.map = function(latitude, longitude){
    var mlxUrl = '//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      mlx = new L.TileLayer(mlxUrl, {maxZoom: 18}),
      map = new L.Map('map', {layers: [mlx], center: new L.LatLng(latitude, longitude), zoom: 15 })
    var drawnItems = new L.FeatureGroup(),
        drawControl = _pref(drawnItems)
    map.addLayer(drawnItems)
    map.addControl(drawControl)
    _events(map, drawnItems) // bind events
    jQuery(document).on('click', 'a.start', function ( e ) {
      new L.Draw.Polygon(map, drawControl.options.polyline).enable();
    })
    return map
  }

  _events = function(map, drawnItems){
    console.log('map',map)
    map.on('draw:created', function (e) {
      var type = e.layerType,
          layer = e.layer,
          store = ""
      
      if (type === "circle"){
        var radius = layer._radius
        store = '{ "latLng": [' + layer._latlng.lat + ', ' + layer._latlng.lng + '], "radius": ' + radius + ', "type": "circle"}'
      } else {
        var j = _getJSON(layer),
            parse = JSON.parse(j),
            p = _getPolygonCenter(parse)
          console.log("p", p)
        store = '{ "latLng": ' + j + ', "type": "polygon", \
          "center": [' + p + '], \
          "zoom": "' + map.getZoom() + '" }'
      }

      drawnItems.addLayer(layer)
      jQuery.post( "/saveArea", { area: JSON.stringify(store) }, function (res) {
        var event = new CustomEvent('area_created', { 'detail': [store, res] })
        document.dispatchEvent(event)
        console.log(event)
      }, "json")
    })

    map.on('draw:edited', function (e) {
      var layers = e.layers;
      var countOfEditedLayers = 0;
      layers.eachLayer(function(layer) {
        countOfEditedLayers++
      })
    })
    
  }

  _pref = function(drawnItems){
    var drawControl = new L.Control.Draw({
      position: 'topleft',
      draw: {
        polyline: false,
        rectangle: false,
        polygon: false,
        // polygon: {
        //   allowIntersection: false,
        //   showArea: true,
        //   drawError: {
        //     color: '#b00b00',
        //     timeout: 1000
        // //   },
        //   shapeOptions: {
        //     color: '#bada55'
        //   }
        // },
        circle: false,
        // circle: {
        //   shapeOptions: {
        //     color: '#662d91'
        //   }
        // },
        marker: false
      }
      // edit: {
      //   featureGroup: drawnItems,
      //   remove: false
      // }
    })
    return drawControl
  }

  _getPolygonCenter = function(arr){
    return arr.reduce(function (x,y) {
      return [x[0] + y[0]/arr.length, x[1] + y[1]/arr.length] 
    }, [0,0]) 
  }

  _getJSON = function(layer){
    var group = [],
        groups = []

    layer._latlngs.forEach(function forEach(ll){
      group.push('[' + ll.lat + ', ' + ll.lng + ']')
    })

    groups.push('[' + group.join(', ') + ']')
    
    return groups
  }

})(window, document)