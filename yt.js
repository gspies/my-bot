/*var search = require('youtube-search');
 
var opts = {
  maxResults: 10,
  key: 'AIzaSyCXzsVCNuy1XSf26xynQHJwrQ8V0stEUoM'
};
 
search('rocket league', opts, function(err, results) {
  if(err) return console.log(err);
 
  console.dir(results);
});*/

import $ from jquery;

var name = "finessegreg";
$.get('https://rltracker.pro/profiles/' + name + "/steam", function(response) {
	console.log(response);
})