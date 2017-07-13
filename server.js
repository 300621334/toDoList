//he used word 'settings' for 'params' https://openclassrooms.com/courses/ultra-fast-applications-using-node-js/creating-your-first-app-with-node-js
//node is mono-thread BUT none of fn is blocking: when .createServer() finishes call-bk handler... 
//node's core is very small. Extensions(lib/modules) add fn. e.g. to upload file, to create server, to validate credit-card field, to show touch-pad, connect to DB etc
//Frameworks r like super-mudules/libs e.g. Express.js , Django or Symfony2

/*modules r .js files BUT don't put .js extension when requiring em. Natives modules don't need './' or '../' but user created modules do.
if skip './test' then need a folder "node_modules" that will contain test.js. It's a node's std.https://openclassrooms.com/courses/ultra-fast-applications-using-node-js/node-js-modules-and-npm*/


//Express allows to chain app.get().get().use(if noth matched) https://openclassrooms.com/courses/ultra-fast-applications-using-node-js/express-js-framework
//express has dynamic(variable) route via "/house/:varRooms/beds" etc. For :varRooms pass any number (/house/3/beds) that is accessed as ?req.params.varRooms" avoiding need for querystr-suffix ?varRooms=3 etc
//Express can render HTML-view from template languages (res.render('bedroom.ejs'...), like Twig, Smarty, Haml, JSP, Jade, and EJS(Embedded JavaScript) to easily create HTML e programming: u call the template file from node file (app.js) also pass params(vars) that template need to populate HTML with.

/*"npm install ejs" --or-- put in pkg.JSON & r-clk "npm" & update... We can now delegate the management of the (HTML) view to our template engine. No more need to write HTML code in the middle of JavaScript, in a res.write('<html>...') e.g.
app.get('/floor/:floornum/bedroom', function (req, res) {
    res.render('bedroom.ejs', { floor: req.params.floornum }); //bedroom.ejs file that must be found in a sub-folder called "views"
});

 * 
 * 
 * bedroom.ejs in sub-folder "views" looks like
 * 
 * 
<h1>You're in the bedroom </h1>
<p>You're on floor no <%= floor %></p>*/

////---8--- Express comes e 15 middlewares=provides a micro-feature & more can be NPM


////---7--- Pass a num from URL & an array of names to .ejs (embedded JS) template file
//var app = require('express')(); //var app = express();

//app.get('/count/:num', function (req, res) {
//    var namesArray = ['mani', 'xoi', 'mithaaa'];
//    res.render( 'randomName.ejs' , {counter: req.params.num , names: namesArray} );//pass vars to page.ejs in folder="views" & call it to display HTML
//});//if miss single-quotes aroung file name then it thinks it's a var & err "randomNames is not defined"

//app.listen(5000);


////---6---To emit event of ur own rather than built-in events. Create a new obj from eventEmitter module(aka library/extensions)
//var emitterClass = require('events').EventEmitter;
//var emitterObject = new emitterClass();

////.on = listen to event & decide what callBk to trigger when event happens
//emitterObject.on('newPlayerArrived', function (playerName, playerAge) { console.log(playerName + ' is ' + playerAge); });
////.emit = fire event
//emitterObject.emit('newPlayerArrived', 'mani', '35');//any name for event + params to be passed to callBk fn



////----5---attach event-handlers to obj e.g. to server-obj fires events when closed etc------ https://openclassrooms.com/courses/ultra-fast-applications-using-node-js/events
//// NOTE: callBk-fn passed to createServer(x) is implicitly added as a handler to 'request' event fired by server-obj. like: var server = http.createServer(); server.on('request', function (req, res) { });
////You can listen to an event multiple times. Call the on() function twice for the same event and both callback functions will be called when the event takes place.


//function callBk(req, res) { console.log('hi srvr started BUT this callBk, implicitly assigned to request-event, does NOT even get a chance to be logged on console bcoz srvr.close before any browser-req came in');}
//var server = require('http').createServer(callBk);

//server.on('close', function () { console.log('Server closed... Good Bye!'); });

//server.listen(5000);
//server.close();// Stops the server. Triggers the close event




////----------4---parse querystring-------

//var url = require('url');
//var querystr = require('querystring');

//var handlerFn = function (req, res) {
//var params = querystr.parse( url.parse( req.url ).query ) //params is a named collection of qs items/settings/params

//    res.writeHead(200, {'content-type':'text/html'});
//    //if ('name' in params && 'age' in params) {
//    if (params.name && params.age) {
//        res.write('Name is ' + params['name'] + '<br>');//can also do params.name, params.age
//        res.write('Age is ' + params.age);
//    }
//    else {
//        res.write('you didn\'t provide name & age');
//    }
    
//    res.end();
//}

//require('http').createServer(handlerFn).listen(5000);


////----------3----select res based on path requested-------
//var url = require('url'); //to parse req.URL into .pathname/.query-str conponents 
//require('http').createServer(callFn).listen(5000);//putting .listen() BEFORE fn can cause endless waiting. So better put .listen() at the end when all reqd things r defined; even thou i didn't do that here.

//function callFn(req, res) 
//{
//    var page = url.parse(req.url).pathname; //contains slash like '/home'
//    var querystr = url.parse(req.url).query; //does NOT contain '?'
//    res.writeHead(200, {'content-type':'text/plain'});    
    
////could do following e Express too. But here doing routing e-out Express.
//    if (page == '/home') //alternately use Express (see #7) app.get('/', callBk(){setHeader instead of writeHead...})
//        res.write('this is home page');
//    if (page == '/contacts')
//        res.write('this is contacts page');
//    else if (page != '/favicon.ico' && page != '/home' && page != 'contacts')//Most browsers send 2nd query looking for tab-icon. That 2nd req fires this else.
//    {
//        res.writeHead(404);//not found
//        res.write('You called ' + page + '?' + querystr + ' page');
//    }
   
//    console.log(page);
//    res.end();
//}


////----------2-------------
//var url = require('url'); //node searches disk for url.js (part of core/native node instalation)
//require('http').createServer(callFn).listen(5000);//no variable used
//function callFn(req, res) 
//{
//    var page = url.parse(req.url).pathname;
//    var querystr = url.parse( req.url ).query;

//    res.writeHead(200, { 'content-type': 'text/plain' });
//    res.end(page + querystr);/*prints path of page called*/
//    console.log(page);//this prints an extra line than browser. Most browser make a 2nd query (/favicon.ico) for icon image to be shown in tab
//}


////----------1-------------//caalBk fn passed to createServer(x) is implicitly added to 'request' event of server-obj like server.on('request', function(){...})
//var callFn = function (req, res) { res.writeHead(200); res.write('hello...no var used'); res.end(); }
//var server = require('http').createServer(callFn).listen(5000);//if place this line 1st then page keeps 'waiting for localhost' bcoz callBk() doesn't exist yet




//cmd
//https://openclassrooms.com/courses/ultra-fast-applications-using-node-js/node-js-modules-and-npm
//NPM is like yum or apt-get for linux.
//Node.js modules to decouple your code and avoid writing everything in one file.
//chk version="npm -v". Get latest NPM = "npm install npm@latest -g"
//"npm search postgresql" to find all libs that 've sth to do e postgresql
//""npm install markdown"" = locally put into node_modules folder. Just for this proj. Can install diff ver for diff projs

/*Globally installed modules can’t be included in your Node.js projects with rrequire()! They’re only there to give supplementary commands in the console.
 If you want to use them in JavaScript, you must also install them locally as per usual (without the -g).*/

//""npm update ""= search on the databases to see if there are any new versions of the modules, then update the modules that are installed on your machine (whilst making sure not to break the compatibility) and it will delete the old versions. In short, it’s the magic command.

/*manually updating module brings in latest version & since modules evolve from version to version, your program might become incompatible following an update to an external module!
 * So better way is to specify version of dependencies in package.JSON and then update
 * ("~0.4" tilde allows minor changes (risky) e.g. 0.4.X, 0.5.X onwards BUT ~0.4.5 allows patches like 0.4.6,7,8,9 i.e.  e-in that version BUT not minor/major updates = 1.2.3 major=1, minor=2, patch=3)*/
