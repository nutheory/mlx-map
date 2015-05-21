(function (window, document, undefined){

  MLXMAP = {}

  _areaListItem = function(a){ return " \
    <li data-latlng=\"" + a.latLng + "\" data-type=\"" + a.type + "\" data-center=\"" + a.center + "\" data-zoom=\"" + a.zoom + "\"> \
      <a class=\"show_area\" href=\"/area/" + a._id + "\">" + a._id + "</a> \
      <a class=\"del\" href=\"/delete/" + a._id + "\"><i class=\"fa fa-lg, fa-trash-o\"></i></a> \
    </li>"
  }

  

  MLXMAP.map = function(latitude, longitude){
    map_center.push(latitude)
    map_center.push(longitude)    
    var mlxUrl = '//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      mlx = new L.TileLayer(mlxUrl, {maxZoom: 18}),
      map = new L.Map('map', {layers: [mlx], center: new L.LatLng(map_center[0], map_center[1]), zoom: 1 }),
      drawnItems = new L.FeatureGroup(),
      drawControl = _pref(drawnItems)
    map.addLayer(drawnItems)
    map.addControl(drawControl)
    _events(map, drawnItems, drawControl)
    return map
  }


  _events = function(map, drawnItems, drawControl){

    jQuery(document).on('click', '#initialize_polygon', function ( e ) {
      new L.Draw.Polygon(map, drawControl.options.polygon).enable();
    })

    $(document).on('click', '#reset_map', function (e){
      map.remove()
      map = MLXMAP.map(map_center[0], map_center[1])
    })

    map.on('draw:created', function (e) {
      var type = e.layerType,
          layer = e.layer,
          json = _buildShapeJSON(type, layer)

      drawnItems.addLayer(layer)
      _postArea(json)
    })

  }


  _pref = function(drawnItems){
    var drawControl = new L.Control.Draw({
      position: 'topleft',
      draw: {
        polyline: false,
        rectangle: false,
        polygon: false,
        circle: false,
        marker: false
      }
    })
    return drawControl
  }


  _buildShapeJSON = function(type, layer){
    if (type === "circle"){
      var radius = layer._radius,
          json = '{ "latLng": [' + layer._latlng.lat + ', ' + layer._latlng.lng + '], \
            "radius": ' + radius + ', "type": "circle" }'
    } else {
      var j = _getJSON(layer),
          parse = JSON.parse(j),
          p = _getPolygonCenter(parse),
          json = '{ "latLng": ' + j + ', "type": "polygon", \
            "center": [' + p + '], "zoom": "' + map.getZoom() + '" }'
    }
    return json
  }


  _getPolygonCenter = function(arr){
    return arr.reduce(function (x, y) {
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


  _getAreas = function () {
    $("#saved_searches").html("")
    jQuery.get('/areas', function ( res ){
      res.areas.forEach(function forEach(a){
        jQuery("#saved_searches").append(_areaListItem(a))
      })
    })
  }


  _postArea = function (json) {
    jQuery.post( "/saveArea", { area: JSON.stringify(json) }, function (res) {
      jQuery("#saved_searches").append(_areaListItem(a))
    }, "json")
  }






})(window, document)