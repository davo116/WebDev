var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");
var url = "mongodb://localhost:27017/res_db";
var MongoClient = require('mongodb').MongoClient;

var index = require('./routes/index');
//var home = require('./routes/home');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.jpg')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'nw87vwn53w8n5yf83sk5snk7s85vsnvg37tgs',
    resave: true,
    saveUninitialized: false
}));

app.use('/', index);
//app.use('/home', home);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});





/*

//
//Setup database, tables, and fake data
//


//Create DB and connect

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
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
    var myobj = { desc: "Temp Item", price: 0};
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



///
///Counter
///

//Create completed orders - table
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("res_db");
    dbo.createCollection("com_orders", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
});

// Insert temp row
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("res_db");
    var myobj = { order_time: Date.now(), table_no: 0, order: "temp", notes: "temp", total: 0};
    dbo.collection("com_orders").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 completed order inserted");
        db.close();
    });
});

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("res_db");
    dbo.collection("com_orders").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});



///
///Income
///

//Create saved bills - table
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("res_db");
    dbo.createCollection("saved_bills", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
});

// Insert temp row
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("res_db");
    var myobj = { save_time: Date.now(), total: 0};
    dbo.collection("saved_bills").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 bill inserted");
        db.close();
    });
});

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("res_db");
    dbo.collection("saved_bills").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});

*/




/*

//
// Drop all tables
//

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

// drop customer orders - table
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("res_db");
    dbo.collection("customer_order").drop(function(err, delOK) {
        if (err) throw err;
        if (delOK) console.log("Collection deleted");
        db.close();
    });
});

// drop menu - table
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("res_db");
    dbo.collection("menu").drop(function(err, delOK) {
        if (err) throw err;
        if (delOK) console.log("Collection deleted");
        db.close();
    });
});

// drop completed orders - table
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("res_db");
    dbo.collection("com_orders").drop(function(err, delOK) {
        if (err) throw err;
        if (delOK) console.log("Collection deleted");
        db.close();
    });
});

// drop saved bills - table
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("res_db");
    dbo.collection("saved_bills").drop(function(err, delOK) {
        if (err) throw err;
        if (delOK) console.log("Collection deleted");
        db.close();
    });
});


*/








module.exports = app;

app.listen(3000, function(err){
    console.log('server is running');
})