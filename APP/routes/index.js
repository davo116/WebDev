var express = require('express');
var router = express.Router();
var url = "mongodb://localhost:27017/res_db";
var MongoClient = require('mongodb').MongoClient;


//POST user clicks to login
router.post('/login', function(req, res){
    //retrieve the form
    var username = req.body.username;
    var acc_lvl = req.body.acc_lvl;
    var password = req.body.password;

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
                    res.redirect('/waiter');
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

//POST user clicks to login
router.post('/logout', function(req, res){
    console.log("test logout");
});





//GET root - display login form
router.get('/', function(req, res) {
    res.render('index', { 
        data: '',
        title: 'Restaurant App Login',
        description: 'Please login to access the system.'
    });
});

//GET waiter page
router.get('/waiter', function(req, res) {
    res.render('waiter', { 
        data: '',
        title: 'Order Form',
        description: 'Place orders here.'
    });
});

//GET kitchen page
router.get('/kitchen', function(req, res) {
    res.render('kitchen');
});

//GET counter page
router.get('/counter', function(req, res) {
    res.render('counter');
});

//GET admin page
router.get('/admin', function(req, res) {
    res.render('admin');
});



//
//Waiter
//

//POST display all orders to kitchen
router.post('/menu_request', function(req, res) {

    MongoClient.connect(url, function(err,db){ 
        if (err) throw err;
        var myDB = db.db('res_db');

        myDB.collection("menu").find({}).sort({desc: 1}).toArray(function(err, results) {
            if (err) throw err;
            res.send(JSON.stringify(results));
            res.end();
            db.close();
        });
    });
});

//POST item has been added, get items price from menu table
router.post('/item', function(req, res) {
    var x = req.body;
    console.log(x);

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

//POST send from waiter to server, get values and store in database order table
router.post('/place_order', function(req, res) {

    var tableNo = req.body.table_no;
    var orderText = req.body.order_text;
    var noteText = req.body.note_text;
    var total = req.body.total;

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("res_db");
        var myobj = { order_time: Date.now(), table_no: tableNo, order: orderText, notes: noteText, total: total};
        dbo.collection("customer_order").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("1 customer order inserted");
            db.close();
        });
        //res.redirect('/waiter');

        res.render('waiter', { 
            data: '',
            title: 'Order Form',
            description: 'Place orders here.'
        });
    });

});



//
//Kitchen
//

//POST display all orders to kitchen
router.post('/order', function(req, res) {

    MongoClient.connect(url, function(err,db){ 
        if (err) throw err;
        var myDB = db.db('res_db');

        myDB.collection("customer_order").find({}).sort({order_time: -1}).toArray(function(err, results) {
            if (err) throw err;
            res.send(JSON.stringify(results));
            res.end();
            db.close();
        });
    });
});

//POST finds order, copies order to completed orders table, deletes original order.
router.post('/deleteOrder', function(req, res) {

    MongoClient.connect(url, function(err,db){ 
        if (err) throw err;
        var dbo = db.db('res_db');
        var collection = dbo.collection('customer_order');

        var ObjectId = require('mongodb').ObjectId;
        var objectid = new ObjectId(req.body._id);
        //console.log("test " + objectid);

        var myquery = {_id: objectid};

        collection.findOne(myquery, function(err, results) {
            if (err) throw err;
            if (results === null) {
                console.log(results);
                console.log("no order found");
                db.close();
            } else {
                console.log(results);

                MongoClient.connect(url, function(err, db) {
                    if (err) throw err;
                    var dbo = db.db("res_db");
                    var myobj = results;
                    dbo.collection("com_orders").insertOne(myobj, function(err, res) {
                        if (err) throw err;
                        console.log("1 completed order inserted");
                        db.close();
                    });
                });

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
                db.close();
            }
        });
    });
    res.send("OK");
    res.end();
});



//
//Counter
//

//POST display all completed orders to counter
router.post('/completed_orders', function(req, res) {

    MongoClient.connect(url, function(err,db){ 
        if (err) throw err;
        var myDB = db.db('res_db');

        myDB.collection("com_orders").find({}).sort({order_time: -1}).toArray(function(err, results) {
            if (err) throw err;
            res.send(JSON.stringify(results));
            res.end();
            db.close();
        });
    });
});

//POST save bill
router.post('/save_bill', function(req, res) {

    MongoClient.connect(url, function(err,db){ 
        if (err) throw err;
        var dbo = db.db('res_db');
        var collection = dbo.collection('com_orders');

        var ObjectId = require('mongodb').ObjectId;
        var objectid = new ObjectId(req.body._id);

        var myquery = {_id: objectid};

        collection.findOne(myquery, function(err, results) {
            if (err) throw err;
            if (results === null) {
                console.log(results);
                console.log("no completed order found");
                db.close();
            } else {

                MongoClient.connect(url, function(err, db) {
                    if (err) throw err;
                    var dbo = db.db("res_db");
                    var myobj = { save_time: Date.now(), total: results.total};
                    dbo.collection("saved_bills").insertOne(myobj, function(err, res) {
                        if (err) throw err;
                        console.log("1 bill saved");
                        db.close();
                    });
                });
                db.close();
            }
        });
    });

    res.send("OK");
    res.end();
});

//POST print bill
router.post('/print_bill', function(req, res) {

    MongoClient.connect(url, function(err,db){ 
        if (err) throw err;
        var dbo = db.db('res_db');

        var ObjectId = require('mongodb').ObjectId;
        var objectid = new ObjectId(req.body._id);

        var myquery = {_id: objectid};

        dbo.collection("com_orders").find(myquery).sort({order_time: -1}).toArray(function(err, results) {
            if (err) throw err;
            res.send(JSON.stringify(results));
            res.end();
            db.close();
        });

    });

});

//POST delete bill
router.post('/del_bill', function(req, res) {

    MongoClient.connect(url, function(err,db){ 
        if (err) throw err;
        var dbo = db.db('res_db');

        var ObjectId = require('mongodb').ObjectId;
        var objectid = new ObjectId(req.body._id);

        var myquery = {_id: objectid};

        dbo.collection("com_orders").deleteOne(myquery, function(err, obj) {
            if (err) throw err;
            console.log("1 completed order deleted");
            db.close();
        });
    });
    res.send("OK");
    res.end();
});



//
//Admin
//

//POST send from admin to server, get values and store in database menu table
router.post('/add_item', function(req, res) {

    var itemText = req.body.add_item;
    var itemPrice = parseFloat(req.body.add_price);

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("res_db");
        var myobj = { desc: itemText, price: itemPrice};
        dbo.collection("menu").insertOne(myobj, function(err, res) {
            if (err) throw err;

            if (res === null) {
                console.log("failed to add menu item");
                db.close();
            } else {
                console.log("1 menu item added");
                db.close();
            }
        });
        //res.redirect('/admin');
        res.render('admin');
    });
});

//POST send from admin to server, get values and delete from database menu table
router.post('/del_item', function(req, res) {
    var x = req.body;
    console.log(x);

    MongoClient.connect(url, function(err,db){ 
        if (err) throw err;
        var dbo = db.db('res_db');

        var myquery = x;

        dbo.collection("menu").deleteOne(myquery, function(err, obj) {
            if (err) throw err;
            if (obj === null) {
                console.log("menu item not found");
                db.close();
            } else {
                console.log("1 menu item deleted");
                db.close();
            }
            
        });
        res.redirect('/admin');
    });


});

//POST send from admin to server, get values and check database menu table and update if found
router.post('/upd_item', function(req, res) {

    var itemText = req.body.upd_item;
    var itemPrice = parseFloat(req.body.upd_price);
    console.log(itemText);
    console.log(itemPrice);

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("res_db");
        var myquery = { desc: itemText };
        var newvalues = { $set: {price: itemPrice} };
        dbo.collection("menu").updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
            console.log("1 menu item price updated");
            db.close();
        });
        //res.redirect('/admin');
        res.render('admin');
    });
});



















module.exports = router;
