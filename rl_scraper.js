function (userID){ 

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
	});
	console.log(ratings);
	return ratings;
}