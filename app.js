var express = require('express');
var session = require('cookie-session'); // Loads the piece of middleware for sessions https://www.npmjs.com/package/cookie-session
var bodyParser = require('body-parser'); // Loads the piece of middleware for KVP(fields-values) in a form(body of req)
var urlencodedParser = bodyParser.urlencoded({ extended: false });//false=body-obj has KVPs as str or array<>true=any dataType.//https://www.npmjs.com/package/body-parser
/*
app.use(bodyParser.json()); // for parsing application/json = JSON encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded = url-encoded bodies //instead of app.use(...) we will pass var urlencodedParser as a 2nd arg
 */



var app = express();


/* app.use(Any_Middleware) used middleware modules = Using the sessions. We create sort of a custom middleware when we pass a fn to app.get(fn...) 
 Each .use/.get keeps passing 4 objects err/req/res/next*/
app.use(session({secret: 'todotopsecret'})) //use-middleware-"session". secret is to secure session-cookie & is a must. you can send other options, such as the lifespan of your session cookie (by default, the session will last as long as the browser is open).


/* If there is no to do list in the session, we create an empty one in the form of an array before continuing */
.use(function(req, res, next){ //could do app.use() multiple times or just make a chain app.use().use().use().get().post().listen()
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next(); //Ref to next route handler, next() refers to next fn .get(‘/todo’, function (){})
})

/* The to do list and the form are displayed */
.get('/todo', function(req, res) { 
    res.render('todo.ejs', {todolist: req.session.todolist});//pass value of 'req.session.todolist' to .ejs file as a var 'todolist'
})

/* Adding an item to the to do list */
.post('/todo/add/', urlencodedParser, function(req, res) {//or could have done .use(urlencodedParser).post('/todo/add/', function(req, res) {}).
    if (req.body.newtodo != '') {
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
})

/* Deletes an item from the to do list */
.get('/todo/delete/:id', function(req, res) {
    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})

/* Redirects to the to do list if the page requested is not found */
.use(function(req, res, next){
    res.redirect('/todo');
})

.listen(8080);   