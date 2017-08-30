var express = require('express'),
    bodyParser = require('body-parser'),
    MongoClient = require('mongodb').MongoClient,
    mongoose = require('mongoose'),
    app = express(),
    db;

//Get data in body from frontend tts
app.use(bodyParser.urlencoded({ extended: true }))

//empModel is our collection(table) name
//empDetails is our database name

//addUser Api
app.post('/addUser', function(req, res) {
    //Add name in empModel collection
    
    db.collection('empModel').save({ fm: req.body.fm }, (err, result) => {
        if (err) return console.log(err)
            //Sending response to front end
        res.send({ message: "Record added" });
    })
})

//getUser Api
app.post('/getUser', function(req, res) {
    //Fetch emp data from database
    db.collection('empModel').find().toArray(function(err, results) {
        if (err) return console.log(err)
            //Sending response to front end
        res.send(results)
    })

})

//updateUser Api
app.post('/updateUser', function(req, res) {
    db.collection("empModel").updateOne({ _id: mongoose.Types.ObjectId(req.body.id) }, { fm: req.body.fm }, function(err, result) {
        if (err) return console.log(err)
            //Sending response to front end
        res.send({ message: "Record updated" });
    });

})

//DeleteUser Api
app.post('/deleteUser', function(req, res) {
    db.collection("empModel").deleteOne({ _id: mongoose.Types.ObjectId(req.body.id) }, function(err, result) {
        if (err) return console.log(err)
            //Sending response to front end
        res.send({ message: "Record deleted" });
    });

})


//Starting server 
MongoClient.connect('mongodb://localhost/empDetails', (err, database) => {
    if (err) return console.log(err)
    db = database
        //App will only start when database is connected
    app.listen(3000, () => {
        console.log('listening on 3000')
    })
})
