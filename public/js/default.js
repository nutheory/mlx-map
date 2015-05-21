(function($){
  
  var lat = -37.7772, 
      lng = 175.2756,
      map_i = MLXMAP.map(lat, lng)

  $(document).on("click", ".show_area", function ( e ){
    e.preventDefault()
    var center = $(this).closest('li').data('center').split(","),
        polyArr = JSON.parse('[' +$(this).closest('li').data('latlng') + ']' ),
        i = 0,
        len = polyArr.length / 2,
        sPolyArr = [],
        mPolyArr = []
    
    for (; i < len; i++){
      sPolyArr = [polyArr[0], polyArr[1]]
      polyArr.splice(0,2)
      mPolyArr.push(sPolyArr)
      sPolyArr = new Array()
    }

    map_i.remove()
    map_i = MLXMAP.map(center[0], center[1])

    polygon = new L.Polygon(mPolyArr)
    polygon.editing.enable()
    map_i.addLayer(polygon)
  }) 

  $(document).on('click', '#lookup_submit', function (e){
    e.preventDefault()
    $.get("/latLng", { 'address': $('#lookup_box').val()}).done(function (res) {
      lat = res.lat
      lng = res.lng
      map_i.remove()
      map_i = MLXMAP.map(lat, lng)
    })
  })

  $(document).on('click', '.del', function (e){
    e.preventDefault()
    var ct = $(e.currentTarget).closest('li')
    $.post($(e.currentTarget).prop('href'), function ( res ){
      $(ct).remove()
    })
  })

  $('.sliding-panel-button,.sliding-panel-fade-screen,.sliding-panel-close').on('click touchstart',function (e) {
    $('.sliding-panel-content,.sliding-panel-fade-screen').toggleClass('is-visible')
    e.preventDefault()
  })

})(jQuery)