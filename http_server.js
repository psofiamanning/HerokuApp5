const express = require('express');
const app     = express();
const low     = require('lowdb');
const fs      = require('lowdb/adapters/FileSync');
const adapter = new fs('db.json');
const db      = low(adapter);

// 1st stepinit the data store
db.defaults({ users: []}).write();

//serve static files from public directory
//-------------------------------------------
app.use(express.static('public'));

// 2nd step data parser - used to parse post data, post is for getting data
var bodyParser =  require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 1st step return all users. This is the route to view the data in db.json
app.get('/data', function(req, res){
    res.send(db.get('users').value());
});

// 2nd step post route
app.post('/test', function(req, res){
    console.log(req.body.username, req.body.password);
    res.send(req.body.username + " " + req.body.password)
});

// 3rd step add user
app.post('/add', function(req, res){
    var user = {
        'name'                        : req.body.name,
        'dob'                         : req.body.dob,
        'email'                       : req.body.email,
        'username'                    : req.body.username,
        'password'                    : req.body.password,
        'phone'                       : req.body.phone,
        'streetaddress'               : req.body.streetaddress,
        'citystatezip'                : req.body.citystatezip,
        'latitude'                    : req.body.latitude, 
        'longitude'                   : req.body.longitude,
        'avatar'                      : req.body.avatar
    }
    db.get('users').push(user).write();
    console.log(db.get('users').value());
    res.send(db.get('users').value());
});


// 1st step. Start the server. This is an aknowledgement to the console.
app.listen(3000, function(){
    console.log('Running on port 3000!')
})