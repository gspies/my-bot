var request = require('request');
var cheerio = require('cheerio');

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

/*http.get('http://rltracker.pro/profiles/' + name + "/steam", function(response) {
	console.log(response);
})*/
//var testobj = [3213,123,123];
var data = "1231,3213,123\n" + "142,13,321\n"+ "1421,135,3231\n"+ "1421,133,3221\n";

var details = [ 
        {'Rank': 0},
        {'Level': 0},
        {'XP': 0}
    ];
    var stats = [
        {'Overall':details},
        {'Attack':details},
        {'Defense':details},
        {'Strength':details},
        {'Hitpoints':details},
        {'Ranged':details},        
        {'Prayer':details},
        {'Magic':details},
        {'Cooking':details},
        {'Woodcutting':details},
        {'Fletching':details},
        {'Fishing':details},
        {'Firemaking':details},
        {'Crafting':details},
        {'Smithing':details},
        {'Mining':details},
        {'Herblore':details},        
        {'Agility':details},
        {'Thieving':details},
        {'Slayer':details},
        {'Farming':details},
        {'Runecraft':details},
        {'Hunter':details},
        {'Construction':details}
    ];

/*request(RS_URL + username, function (error, response, html) {
      console.log("in request");
      console.log(error);
      console.log 
      if (!error && response.statusCode == 200) {
        //var $ = cheerio.load(html);
        console.log(html);
        var prettyHtml = html.split("\n");
        for (var i = 0; i < prettyHtml.length; i++){
            var stat = prettyHtml.split(',');
            for(var j = 0; j < stat.length; j++){
                stats[i] =
            }
            stats[i]
        }
        
      }
      console.log(stats);
    });
*/

var prettyHtml = data.split("\n");
for (var i = 0; i < prettyHtml.length; i++){
    var stat = prettyHtml[i].split(',');
    console.log("stat",stat);
    console.log("stats[i]",stats[i]);
    console.log("stats[i].value[j]",stats[i].Rank);
    
    if(stat.length == 3){
        stats[i].Rank = stat[0]; 
        stats[i].Level = stat[1]; 
        stats[i].XP = stat[2];
    }
    else{
        for(var j = 0; j < stat.length; j++){
        	stats[i].Rank = stat[j]; 
        	stats[i].Level = stat[j]; 
        	stats[i].XP = stat[j];
        }

    }
    
}
console.log(stats);