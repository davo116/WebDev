var url = "mongodb://localhost:27017/res_db";
var MongoClient = require('mongodb').MongoClient;

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

    // Create staff table
    dbo.createCollection("staff_login", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });

    // Popluate with fake data
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



///
///Customer Order
///

//Create customer_order - table
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("res_db");

    // Create customer order table
    dbo.createCollection("customer_order", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });

    // Populate with fake data
    var myobj = { order_time: Date.now(), table_no: 0, order: "Placeholder Order", notes: "Placeholder Note", total: 0};
    dbo.collection("customer_order").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 customer order inserted");
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

    // Create menu table
    dbo.createCollection("menu", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });

    // Populate with fake data
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



///
///Counter
///

//Create completed orders - table
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("res_db");

    // Create completed orders table
    dbo.createCollection("com_orders", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });

    // Populate with fake data
    var myobj = { order_time: Date.now(), table_no: 0, order: "Placeholder Order", notes: "Placeholder Note", total: 0};
    dbo.collection("com_orders").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 completed order inserted");
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

    // Create saved bills table
    dbo.createCollection("saved_bills", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });

    // Populate with fake data
    var myobj = { save_time: Date.now(), total: 0};
    dbo.collection("saved_bills").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 bill inserted");
        db.close();
    });
});





