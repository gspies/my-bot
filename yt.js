/*var search = require('youtube-search');
 
var opts = {
  maxResults: 10,
  key: 'AIzaSyCXzsVCNuy1XSf26xynQHJwrQ8V0stEUoM'
};
 
search('rocket league', opts, function(err, results) {
  if(err) return console.log(err);
 
  console.dir(results);
});*/
var $ = require('jquery');
var http = require('http');
/*require("jsdom").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }
 
    var $ = require("jquery")(window);
});*/

var name = "finessegreg";
http.get('http://rltracker.pro/profiles/' + name + "/steam", function(response) {
	console.log(response);
})