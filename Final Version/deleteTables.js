var url = "mongodb://localhost:27017/res_db";
var MongoClient = require('mongodb').MongoClient;

//
// Drop all tables
//

// drop staff_login - table
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("res_db");
    dbo.collection("staff_login").drop(function(err, delOK) {
        if (err) throw err;
        if (delOK) console.log("Collection staff_login deleted");
        db.close();
    });
});

// drop customer orders - table
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("res_db");
    dbo.collection("customer_order").drop(function(err, delOK) {
        if (err) throw err;
        if (delOK) console.log("Collection customer_order deleted");
        db.close();
    });
});

// drop menu - table
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("res_db");
    dbo.collection("menu").drop(function(err, delOK) {
        if (err) throw err;
        if (delOK) console.log("Collection menu deleted");
        db.close();
    });
});

// drop completed orders - table
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("res_db");
    dbo.collection("com_orders").drop(function(err, delOK) {
        if (err) throw err;
        if (delOK) console.log("Collection com_orders deleted");
        db.close();
    });
});

// drop saved bills - table
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("res_db");
    dbo.collection("saved_bills").drop(function(err, delOK) {
        if (err) throw err;
        if (delOK) console.log("Collection saved_bills deleted");
        db.close();
    });
});




