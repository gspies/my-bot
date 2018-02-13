/*var search = require('youtube-search');
 
var opts = {
  maxResults: 10,
  key: 'AIzaSyCXzsVCNuy1XSf26xynQHJwrQ8V0stEUoM'
};
 
search('rocket league', opts, function(err, results) {
  if(err) return console.log(err);
 
  console.dir(results);
});*/

/*var $ = jQuery = require('jquery')(window);
var http = require('http');
var name = "finessegreg";
*/

var request = require('request');
var cheerio = require('cheerio');
var ratings = ["Solo: ", "Doubles: ", "Solo Standard: ", "Standard: "];
request('http://rltracker.pro/profiles/finessegreg/steam', function (error, response, html) {
  console.log("in request");
  console.log(error);
  
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    var count = 0;
    console.log(html);
    $('div.rating').each(function(i, element){
      var a = $(this).text();
      a = a.replace("Rating ", "");
      if (count < 4){
      	
      	ratings[count++] += a;
      }
      
    });
  }
  console.log(ratings);
});

/*http.get('http://rltracker.pro/profiles/' + name + "/steam", function(response) {
	console.log(response);
})*/