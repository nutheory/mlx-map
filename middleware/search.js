'use strict';

var curl_lib = require('request')


function _grab_collection(req){
  var db = req.db,
      areas = db.get('areas')
  return areas
}

module.exports.parseAddress = function (req, res){
  var lat, lng, response
  var url = "https://maps.googleapis.com/maps/api/geocode/json?&address="
    + encodeURIComponent(req.query.address)

  curl_lib.post(url, function (err, response, body) {
    if (err) { return err }
    var result = JSON.parse(body),
        lat = result.results[0].geometry.location.lat,
        lng = result.results[0].geometry.location.lng
    res.status(200).json({'lat': lat, 'lng': lng})
  })
}

module.exports.saveJSON = function (req, res){
  var areas = _grab_collection(req),
      a = JSON.parse(req.body.area),
      ins = JSON.parse(a)

  areas.insert(ins, function (err, doc){
    if (err) { res.status(500).json({ 'response': err }) }
    res.status(200).json({'doc': doc })
  })
}

module.exports.getAllAreas = function (req, res, next){
  var areas = _grab_collection(req)

  areas.find({}, function (err, docs){
    console.log("err", err)
    console.log("docs", docs)
    if (err) { res.status(500).json({ 'response': err }) }
    // next()
    res.status(200).json({'areas': docs})
  })
}

module.exports.getArea = function (req, res, next){
  var areas = _grab_collection(req),
      aid = req.query.aid  
}

module.exports.destroyArea = function (req, res, next){
  var areas = _grab_collection(req)
  console.log('req', req.params.id)
  areas.remove({"_id": req.params.id}, function (err){
    if (err) { res.status(500).json({ 'response': err }) }
    res.status(200)
  })
}




