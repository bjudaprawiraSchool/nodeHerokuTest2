var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://newUser:brave123@ds259105.mlab.com:59105/heroku_6rdr5zwb';
//LOAD the various controllers
//var controllerMain = require('../controllers/main');   //this will load the main controller file
var controllerMongoCollection = require('../controllers/database'); //load controller code dealing with database mongodb and Routes collection

//########################################
//to process data sent in on request need body-parser module
/*var bodyParser = require('body-parser');
var path = require ('path'); //to work with separtors on any OS including Windows
var querystring = require('querystring'); //for use in GET Query string of form URI/path?name=value

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true }));*/ // for parsing application/x-www-form-urlencode
//#########################################

router.get('/mongodb', function (request, response) {

    mongodb.MongoClient.connect(mongoDBURI, function(err, db) {
        if(err) throw err;

        //get collection of orders
        var Orders = db.collection('Orders');

        //get all Orders
        Orders.find({ }).sort({ name: 1 }).toArray(function (err, docs) {

            if(err) throw err;

            response.render('/getAllOrders', {results: docs});

        });

        //close connection when your app is terminating.
        db.close(function (err) {
            if(err) throw err;
        });

    });//end of connect

});//end router.get

router.get('/getAllOrders', controllerMongoCollection.getAllOrders);

//now processing post
/*router.post('/readNameAndRespond', function(req, res, next) {
    //expecting data variable called name --retrieve value using body-parser
    var value_name = req.body.name;  //retrieve the data associated with name
    res.send("hello " + value_name);
});*/

 //GET home page.
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

module.exports = router;
