var express = require('express');
var router = express.Router();
var url = "mongodb://localhost:27017/res_db";
var MongoClient = require('mongodb').MongoClient;

//Setup Database and Tables
/*router.get('/', function(req, res, next) {
    var MongoClient = require('mongodb').MongoClient;

    //Create DB and connect
    var url = url;

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        console.log("Database created!");
        db.close();
    });


    // drop staff_login - table
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("res_db");
        dbo.collection("staff_login").drop(function(err, delOK) {
            if (err) throw err;
            if (delOK) console.log("Collection deleted");
            db.close();
        });
    });

    // drop collection - table
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("res_db");
        dbo.collection("customer_order").drop(function(err, delOK) {
            if (err) throw err;
            if (delOK) console.log("Collection deleted");
            db.close();
        });
    });

    // drop collection - table
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("res_db");
        dbo.collection("menu").drop(function(err, delOK) {
            if (err) throw err;
            if (delOK) console.log("Collection deleted");
            db.close();
        });
    });



    ///
    ///Staff Members
    ///

    //Create staff - table
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("res_db");
        dbo.createCollection("staff_login", function(err, res) {
            if (err) throw err;
            console.log("Collection created!");
            db.close();
        });
    });

    // Insert temp row
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("res_db");
        var myobj = { username: "Staff1", password: "password", acc_lvl: "Waiter"};
        dbo.collection("staff_login").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("staff member inserted");
            db.close();
        });
    });

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("res_db");
        var myobj = [
            { username: "Staff1", password: "password", acc_lvl: "Waiter"},
            { username: "Staff2", password: "password", acc_lvl: "Kitchen"},
            { username: "Staff3", password: "password", acc_lvl: "Counter"},
            { username: "Staff4", password: "password", acc_lvl: "Admin"}
        ];
        dbo.collection("staff_login").insertMany(myobj, function(err, res) {
            if (err) throw err;
            console.log("Staff members inserted: " + res.insertedCount);
            db.close();
        });
    });

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("res_db");
        dbo.collection("staff_login").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });

    ///
    ///Customer Order
    ///

    //Create customer_order - table
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("res_db");
        dbo.createCollection("customer_order", function(err, res) {
            if (err) throw err;
            console.log("Collection created!");
            db.close();
        });
    });

    // Insert temp row
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("res_db");
        var myobj = { order_time: Date.now(), table_no: 9999, order: "temp", notes: "temp", total: 0};
        dbo.collection("customer_order").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("1 customer order inserted");
            db.close();
        });
    });

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("res_db");
        dbo.collection("customer_order").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });

    ///
    ///Menu
    ///

    //Create menu - table
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("res_db");
        dbo.createCollection("menu", function(err, res) {
            if (err) throw err;
            console.log("Collection created!");
            db.close();
        });
    });

    // Insert temp row
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("res_db");
        var myobj = { desc: "temp desc", price: 9999};
        dbo.collection("menu").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("1 menu item inserted");
            db.close();
        });
    });

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("res_db");
        var myobj = [
            { desc: "M1 Chicken Breast with veg", price: 5.80},
            { desc: "M2 Beef Soup", price: 4.50},
            { desc: "M3 Mix Grill", price: 6.70},
            { desc: "M4 Salt and Pepper Bites", price: 4},
            { desc: "M5 Double Cooked Pork", price: 7},
            { desc: "S1 Spring Rolls", price: 2.20},
            { desc: "S2 Chips", price: 1.50},
            { desc: "S3 Gravy", price: 0.50},
            { desc: "S4 Hot Sauce", price: 0.50},
            { desc: "S5 Rice", price: 1},
            { desc: "D1 Water", price: 0.70},
            { desc: "D2 Coke", price: 1.10},
            { desc: "D3 Beer", price: 3.50},
            { desc: "D4 Orange Juice", price: 1.50},
            { desc: "D5 Wine", price: 30.00}
        ];
        dbo.collection("menu").insertMany(myobj, function(err, res) {
            if (err) throw err;
            console.log("Menu items inserted: " + res.insertedCount);
            db.close();
        });
    });

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("res_db");
        dbo.collection("menu").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });


});*/

//GET index page
router.get('/', function(req, res, next) {
    res.render('index', { 
        data: '',
        title: 'Restaurant App Login',
        description: 'Please login to access the system.'
    });
});

//GET home page
router.get('/home', function(req, res, next) {
    res.render('home', { 
        data: '',
        title: 'Order Form',
        description: 'Place orders here.'
    });
});

//GET kitchen page
router.get('/kitchen', function(req, res, next) {
    res.render('kitchen', { 
        data: '',
        title: 'Order Form',
        description: 'Place orders here.'
    });
});

//POST delete order based on ID sent from client
router.post('/deleteOrder', function(req, res, next) {
    //var x = req.body._id;
    //console.log("Data " + x);

    //var MongoClient = require('mongodb').MongoClient;

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("res_db");  
        
        var ObjectId = require('mongodb').ObjectId;
        var objectid = new ObjectId(req.body._id);
        //console.log("test " + objectid);
        
        var myquery = {_id: objectid};
        
        dbo.collection("customer_order").deleteOne(myquery, function(err, obj) {
            if (err) throw err;
            console.log("1 order deleted");
            db.close();
        });
    });

});

//POST 
router.post('/item', function(req, res, next) {
    var x = req.body;
    console.log(x);

    //var MongoClient = require('mongodb').MongoClient;

    // Connect to the db
    MongoClient.connect(url, function(err,db){ 
        if (err) throw err;
        var dbo = db.db('res_db');
        var collection = dbo.collection('menu');

        collection.findOne(x, function(err, results) {
            if (err) throw err;
            if (results === null) {
                console.log(results.price);
                console.log("no menu item");
                db.close();
            } else {
                console.log(results.price);
                console.log("menu item is");
                res.send(JSON.stringify(results.price));
                db.close();
            }
        });
    });


});

//POST display all orders to kitchen
router.post('/order', function(req, res, next) {
    
    //var MongoClient = require('mongodb').MongoClient;

    // Connect to the db
    MongoClient.connect(url, function(err,db){ 
        if (err) throw err;
        var myDB = db.db('res_db');

        myDB.collection("customer_order").find({}).sort({order_time: -1}).toArray(function(err, results) {
            if (err) throw err;
            //console.log(results);
            res.send(JSON.stringify(results));
            //res.send(results);
            //res.send('<p>results here</p>');
            // end response 
            res.end();
            db.close();
        });
    });
});

//POST send from waiter to server, get values and store in database order table
router.post('/place_order', function(req, res, next) {

    //retrieve the form
    var tableNo = req.body.table_no;
    var orderText = req.body.order_text;
    var noteText = req.body.note_text;
    var total = req.body.total;
    //console.log(total);

    //var MongoClient = require('mongodb').MongoClient;


    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("res_db");
        var myobj = { order_time: Date.now(), table_no: tableNo, order: orderText, notes: noteText, total: total};
        dbo.collection("customer_order").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("1 customer order inserted");
            db.close();
        });
        res.redirect('/home');
    });
});

//GET kitchen page
router.post('/kitchen', function(req, res, next) {
    res.render('kitchen', { 
        data: '',
        title: 'Order Form',
        description: 'Place orders here.'
    });
});

//GET counter page
router.get('/counter', function(req, res, next) {
    res.render('counter');
});

//GET admin page
router.get('/admin', function(req, res, next) {
    res.render('admin');
});

//POST logout
router.post('/logout', function(req, res, next) {
    res.redirect('/');
    console.log('user logged out!');
});




router.post('/login', function(req, res, next){
    //retrieve the form
    var username = req.body.username;
    var acc_lvl = req.body.acc_lvl;
    var password = req.body.password;
    //var password = parseInt(req.body.password);

    //var MongoClient = require('mongodb').MongoClient;

    // Connect to the db
    MongoClient.connect(url, function(err,database){ 
        if (err) throw err;
        var myDB = database.db('res_db');
        var collection = myDB.collection('staff_login');

        collection.findOne({ username: username, password: password, acc_lvl: acc_lvl}, function(err, results) {
            if (err) throw err;
            if (results === null) {
                //console.log(results);
                res.render('index', { 
                    data: '',
                    title: 'Restaurant App Login',
                    description: 'Invalid login details!'
                });
            } else {
                if (acc_lvl === "Waiter") {
                    res.redirect('/home');
                } else if (acc_lvl === "Kitchen") {
                    res.redirect('/kitchen');
                } else if (acc_lvl === "Counter") {
                    res.redirect('/counter');
                } else if (acc_lvl === "Admin") {
                    res.redirect('/admin');
                } else {
                    res.render('index', { 
                        data: '',
                        title: 'Restaurant App Login',
                        description: 'Invalid access level!'
                    });
                }
            }
        });
    });
});


module.exports = router;
