var express         = require('express'),
    app             = express(),
    server          = require('http').createServer(app),
    morgan          = require('morgan'),
    curl_lib        = require('request'),
    sass            = require('node-sass'),
    bodyParser      = require('body-parser'),
    search          = require('./middleware/search'),
    mongodb         = require('./lib/mongo'),
    db              = require('monk')(mongodb.url),
    router          = express.Router(),
    port            = process.env.PORT || 8000


app.set('port', port)
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(function (req,res,next){req.db = db;next();})

app.get('/', function (req, res) {
  res.render('index')
})

app.get('/latLng', search.parseAddress)

app.get('/area/:id', search.getArea)

app.get('/areas', search.getAllAreas)

app.post('/saveArea', search.saveJSON)

app.post('/delete/:id', search.destroyArea)

server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port)
})